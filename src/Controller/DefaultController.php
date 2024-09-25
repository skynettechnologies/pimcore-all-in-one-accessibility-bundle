<?php

namespace Skynettechnologies\ADABundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Skynettechnologies\ADABundle\Service\PageService;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class DefaultController extends AbstractController
{
    private $pageService;

    public function __construct(PageService $pageService, ParameterBagInterface $params)
    {
        $this->pageService = $pageService;
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
     */
    public function indexAction(): Response
    {
        return $this->render('@ADAPimcoreBundle/ada_setting.html.twig');
//        return $this->render('layouts/layout.html.twig', compact('aioaUrl'));
    }

}


