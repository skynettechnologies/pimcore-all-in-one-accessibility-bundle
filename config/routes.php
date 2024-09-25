<?php
// config/routes.php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Skynettechnologies\ADABundle\Controller\DefaultController;

$routes = new RouteCollection();

// Route definition
$routes->add('ada_setting', new Route('/ada-setting', [
    '_controller' => [DefaultController::class],
]));

return $routes;
?>
