<?php

namespace App\Controller;

use App\Entity\Template\Template;
use App\Repository\Template\TemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class StagesController extends AbstractController
{
    /**
     * @Route("/stages/1/create", name="stage1Creation")
     */
    public function stage1Create()
    {

        return $this->render('stages/index.html.twig', [
            'controller_name' => 'StagesController',
            'stage'           => 1,
            'mode'            => 'create'
        ]);
    }

    /**
     * @Route("/stages/1/load", name="stages")
     */
    public function stage1Load()
    {
        return $this->render('stages/index.html.twig', [
            'controller_name' => 'StagesController',
            'stage'           => 1 ,
            'mode'            => 'load'
        ]);
    }
}
