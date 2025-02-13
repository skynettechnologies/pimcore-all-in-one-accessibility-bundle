<?php

namespace Skynettechnologies\ADABundle\Command;

use Pimcore\Console\AbstractCommand;
use Skynettechnologies\ADABundle\Service\PageService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class RemoveDynamicPageCommand extends AbstractCommand
{
    protected static $defaultName = 'app:remove-page';
    private $pageService;

    public function __construct(PageService $pageService)
    {
        parent::__construct();
        $this->pageService = $pageService;
    }

    protected function configure()
    {
        $this
            ->setDescription('Removes a page using PageService')
            ->addArgument('pagename', InputArgument::REQUIRED, 'The name of the page to remove');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $pageName = $input->getArgument('pagename');

        try {
            $this->pageService->removePageByName($pageName);
            $output->writeln('Page with name "' . $pageName . '" has been removed.');
        } catch (\Exception $e) {
            $output->writeln('Error: ' . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }
}
