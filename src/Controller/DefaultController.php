<?php

namespace Skynettechnologies\ADABundle\Controller;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Skynettechnologies\ADABundle\Service\PageService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Pimcore\Model\User;

class DefaultController extends AbstractController
{
    private $pageService;
    private $client;
    private $connection;
    public function __construct(PageService $pageService, ParameterBagInterface $params, HttpClientInterface $client, Connection $connection)
    {
        $this->pageService = $pageService;
        $this->client = $client;
        $this->connection = $connection;
    }

    /**
     * @Route("/ada_pimcore", name="ada_pimcore")
     */
    public function someAction(Request $request): Response
    {
        // Retrieve parameters from the request
        $action = $request->query->get('action');
        $pageName = $request->query->get('pageName');

        if ($action === 'create') {
            // Call the service to create a page
            $this->pageService->createAdaPage();
            return new Response('Page created.');
        } elseif ($action === 'remove' && $pageName) {
            // Call the service to remove a page
            try {
                $this->pageService->removePageByName($pageName);
                return new Response('Page with name "' . htmlspecialchars($pageName) . '" has been removed.');
            } catch (\Exception $e) {
                return new Response('Error: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            return new Response('Invalid action or missing parameters.', Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @Route("/ada-setting", name="ada_setting")
     * @throws \Doctrine\DBAL\Exception
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function indexAction(Security $security, RequestStack $requestStack,SessionInterface $session): Response
    {
        $securityToken = $session->get('_security_pimcore_admin');

        if (!$securityToken) {
            return new Response("No security token found in the session.");
        }
        $token = unserialize($securityToken);
        if ($token && $token->getUser() !== null) {
            $user = $token->getUser();
            $userData = $user->getUser();
            if ($userData) {
                $email = $userData->getEmail();
                $name = $userData->getName();
            }
        }
        $domain = $requestStack->getCurrentRequest()->getHttpHost();
        $base64Domain = base64_encode($domain);
        $message = '';

        // API call to get the autologin link
        $aioa_url = 'https://ada.skynettechnologies.us/api/get-autologin-link';
        $response = $this->client->request('POST', $aioa_url, [
            'json' => ['website' => $base64Domain],
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $responseData = $response->toArray();
        $AutologinLink = $responseData;

        // Check the response and handle autologin logic
        if (isset($AutologinLink['status']) && $AutologinLink['status'] == 0) {
            $package_type = "free-widget";
            $arr_details = [
                'name' => $name,
                'email' => $email,
                'company_name' => '',
                'website' => $base64Domain,
                'package_type' => $package_type,
                'start_date' => date('Y-m-d H:i:s'),
                'end_date' => '',
                'price' => '',
                'discount_price' => '0',
                'platform' => 'Pimcore',
                'api_key' => '',
                'is_trial_period' => '',
                'is_free_widget' => '1',
                'bill_address' => '',
                'country' => '',
                'state' => '',
                'city' => '',
                'post_code' => '',
                'transaction_id' => '',
                'subscr_id' => '',
                'payment_source' => '',
            ];

            // Send the second POST request to add the user domain
            $addUserDomainUrl = 'https://ada.skynettechnologies.us/api/add-user-domain';
            $addUserDomainResponse = $this->client->request('POST', $addUserDomainUrl, [
                'json' => $arr_details,
                'headers' => ['Content-Type' => 'application/json'],
            ]);
            $addUserDomainData = $addUserDomainResponse->toArray();

            // Handle success or failure of adding the user domain
            if (isset($addUserDomainData['status']) && $addUserDomainData['status'] === 0) {
                $message = "User domain added successfully.";
            } else {
                $message = "Failed to add user domain. Response: " . json_encode($addUserDomainData);
            }

            // Autologin Link
            $autologinUrl = 'https://ada.skynettechnologies.us/api/get-autologin-link';
            $autologinResponse = $this->client->request('POST', $autologinUrl, [
                'json' => ['website' => base64_encode($domain)],
                'headers' => ['Content-Type' => 'application/json'],
            ]);
            $autologinData = $autologinResponse->toArray();
            if (isset($autologinData['status'])) {
                $message = "Generated Autologin Link Successfully.";
            } else {
                $message = "Failed to generate Autologin link.";
            }

            // Widget Settings API
            $widgetSettingsUrl = 'https://ada.skynettechnologies.us/api/widget-settings-platform';
            $widgetSettingsResponse = $this->client->request('POST', $widgetSettingsUrl, [
                'json' => ['website_url' => $domain],
                'headers' => ['Content-Type' => 'application/json'],
            ]);
            $widgetSettingsData = $widgetSettingsResponse->toArray();
            $widgetData = $widgetSettingsData;
            if (isset($widgetSettingsData['status'])) {
                $message = "Widget Setting Saved Successfully.";
            } else {
                $message = "Failed to save Widget setting.";
            }
        } else {
            $message = "Failed to generate Autologin link for this domain.";
        }

        // Generate the URL for redirection or further processing
        $url = $this->generateUrl('ada_setting'); // Assuming the route exists
        // Render the Twig template with relevant data
        return $this->render('@ADAPimcoreBundle/ada_setting.html.twig', [
            'url' => $url,  // Pass the generated URL to the template
            'domain' => $domain,
            'user_name' => $name,  // Pass the name of the logged-in user
            'email' => $email,     // Pass the email of the logged-in user
            'message' => $message,
            'id' => $widgetData['id'] ?? '',
            'color' => $widgetData['color'] ?? '#420083',
            'position' => $widgetData['position'] ?? 'bottom_right',
            'icon_type' => $widgetData['icon_type'] ?? 'aioa-icon-type-1',
            'icon_size' => $widgetData['icon_size'] ?? 'aioa-default-icon',
            'is_widget_custom_position' => $widgetData['is_widget_custom_position'] ?? 0,
            'widget_position_left' => $widgetData['widget_position_left'] ?? 0,
            'widget_position_top' => $widgetData['widget_position_top'] ?? 0,
            'widget_position_right' => $widgetData['widget_position_right'] ?? 0,
            'widget_position_bottom' => $widgetData['widget_position_bottom'] ?? 0,
            'widget_size' => $widgetData['widget_size'] ?? 0,
            'is_widget_custom_size' => $widgetData['is_widget_custom_size'] ?? 0,
            'widget_icon_size_custom' => $widgetData['widget_icon_size_custom'] ?? 20,
        ]);
    }

}


