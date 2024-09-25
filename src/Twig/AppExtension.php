<?php
// src/Twig/AppExtension.php
namespace Skynettechnologies\ADABundle\Twig;

use Skynettechnologies\ADABundle\ADAPimcoreBundle;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    private $adapimcoreBundle;

    public function __construct(ADAPimcoreBundle $adapimcoreBundle)
    {
        $this->adapimcoreBundle = $adapimcoreBundle;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('AIOA_URL', [$this->adapimcoreBundle, 'getAioaUrl']),
        ];
    }
}
