<?php

namespace Skynettechnologies\ADABundle\Command;

use Pimcore\Console\AbstractCommand;
use Skynettechnologies\ADABundle\Service\PageService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateDynamicPageCommand extends AbstractCommand
{
    protected static $defaultName = 'app:create-page';
    private PageService $pageService;

    public function __construct(PageService $pageService)
    {
        parent::__construct();
        $this->pageService = $pageService;
    }

    protected function configure()
    {
        $this->setDescription('Creates a page using PageService');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->pageService->createAdaPage();
        $output->writeln('Page creation attempted.');
        return Command::SUCCESS;
    }
}

