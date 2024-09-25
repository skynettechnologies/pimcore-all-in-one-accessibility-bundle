<?php

namespace Skynettechnologies\ADABundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;
use Symfony\Component\Config\Resource\FileResource;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class ADAPimcoreBundle extends AbstractPimcoreBundle implements PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;

    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        // Ensure the path to services.yaml is correct
        $configPath = __DIR__ . '/../config/services.yaml'; // Adjust as necessary

        if (!file_exists($configPath)) {
            throw new \RuntimeException("The file {$configPath} does not exist.");
        }

        $container->addResource(new FileResource($configPath));
    }

    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

    public function getJsPaths(): array
    {
        return [
            '/bundles/adapimcore/js/pimcore/startup.js',
            '/bundles/adapimcore/js/pimcore/config.js'
        ];
    }

    public function getCssPaths(): array
    {
        return [
            "/bundles/adapimcore/css/icons.css"
        ];
    }
    public function getAioaUrl(): string
    {
        return 'https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=&token=&position=';
    }
}
