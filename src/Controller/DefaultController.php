<?php

namespace Skynettechnologies\ADABundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends FrontendController
{
    /**
     * @Route("/ada_pimcore")
     */
    public function indexAction(Request $request): Response
    {
        return new Response('Hello world from ada_pimcore');
    }
}
