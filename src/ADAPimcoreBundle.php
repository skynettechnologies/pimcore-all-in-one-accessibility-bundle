<?php

namespace Skynettechnologies\ADABundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;

class ADAPimcoreBundle extends AbstractPimcoreBundle implements PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;

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

}
