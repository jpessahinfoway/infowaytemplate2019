<?php

namespace App\Controller;
require __DIR__.'/../../vendor/autoload.php';

use AddOn\Entity\CSSProperty;
use AddOn\Entity\Incruste;
use AddOn\Entity\IncrusteElement;
use AddOn\Entity\IncrusteStyle;
use AddOn\Entity\Model;
use AddOn\Entity\ModelStyle;
use AddOn\Entity\Property;
use AddOn\Entity\Style;
use App\Entity\Template;
use App\Entity\Zone;
use App\Form\TemplateType;
use App\Service\CSSParser;
use App\Service\IncrusteCSSHandler;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;


class TemplateController extends AbstractController
{

    /**
     * @Route("/template", name="templateAccueil")
     */
    public function index()
    {
        return $this->render('template/accueil/index.html.twig', [
            'controller_name' => 'TemplateController',
        ]);
    }
    /**
     * @Route("/template/stage1/register", name="templateStage1Register",methods="GET")
     */
    public function registerTemplate(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $zonesToRegister = $request->get('zones');
        $templateToRegister = $request->get('template');
        //var_dump($zonesToRegister);
        //var_dump($zonesToRegister);
        var_dump($templateToRegister);
        return new Response('Enregistrement en base OK');
    }

    /**
     * @Route("/template/cssloader/", name="cssLoader",methods="GET")
     */
    public function loadCss()
    {
        $entityManager = $this->getDoctrine()->getManager('addons');
        $allIncrustes = $entityManager->getRepository(Incruste::class)->findAll();

        $incrusteCSSHandler = new IncrusteCSSHandler($allIncrustes);
        $response = new Response($incrusteCSSHandler->getGeneratedCSS());
        $response->headers->set('Content-Type', 'text/css');
        return $response;
    }

    /**
     * @Route("/testpage", name="testPage",methods="GET")
     */
    public function testPage(SerializerInterface $serialize){

        $entityManager = $this->getDoctrine()->getManager('addons');
        $allIncrustes = $entityManager->getRepository(Incruste::class)->findAll();

        $incrusteCSSHandler = new IncrusteCSSHandler($allIncrustes);


        return $this->render('template/model.html.twig', [
            'controller_name' => 'TemplateController'
        ]);

    }

    /**
     * @Route("/template/stage1/model/register", name="registerModel",methods="GET")
     */
    public function registerModel(Request $request,ParameterBagInterface $parameterBag, CSSParser $CSSParser,SerializerInterface $serialize){


        $entityManager = $this->getDoctrine()->getManager('addons');
        $incrusteStyle = json_decode($request->get('incrusteStyle'),true);

        $incrusteResponse = [];
        $newIncruste = new Incruste();

        $newIncruste    ->setName($incrusteStyle['name'])
                        ->setType($incrusteStyle['type']);

        $incrusteResponse['name'] = $newIncruste->getName();
        $incrusteResponse['type'] = $newIncruste->getType();


        foreach($incrusteStyle['contents'] as $content){
            $newIncrusteElement = new IncrusteElement();
            $newIncrusteElement->setIncruste($newIncruste);
            $newIncrusteElement->setType($content['type']);
            foreach($content['style'] as $incrusteStyle){
                $property = $entityManager->getRepository(CSSProperty::class)->findOneBy(['name'=>$incrusteStyle['name']]);

                if($property !== NULL && $incrusteStyle['propertyWritting'] !== NULL){

                    $incrusteContentStyle = new IncrusteStyle();
                    $incrusteContentStyle->setProperty($property);
                    $incrusteContentStyle->setValue($incrusteStyle['propertyWritting']);
                    $newIncrusteElement->addIncrusteStyle($incrusteContentStyle);
                    $entityManager->persist($incrusteContentStyle);

                }
            }
            $entityManager->persist($newIncrusteElement);

            $incrusteResponse['elements'][]=$newIncrusteElement;
        }
        $entityManager->persist($newIncruste);


        $entityManager->flush();


        $incrusteResponse['elements']=array_map(function($incrusteElement){
            return [
                'type' => $incrusteElement->getType(),
                'name' => $incrusteElement->getType().$incrusteElement->getId()];
        }, $incrusteResponse['elements']);


        return new Response(json_encode($incrusteResponse));
      //return new Response(json_encode($response));
    }


    /**
     * @Route("/template/stage1/create", name="templateStages",methods="GET")
     */
    public function stage1Creation(\Symfony\Component\HttpFoundation\Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $templateName = $request->get('name');
        $orientation = $request->get('orientation');
        $template = $em->getRepository(template::class)->findAll();
        return $this->render('template/stages/index.html.twig', [
            'controller_name' => 'TemplateController',
            'templateName'    => $templateName,
            'orientation'     => $orientation,
            'stageNumber'     => 1,
        ]);
    }

    /**
     * @Route("/template/stage2/create", name="templateStage2",methods="GET")
     */
    public function stage2Creation(\Symfony\Component\HttpFoundation\Request $request)
    {

        $ressources = ['medias' => [] ];
        $em = $this->getDoctrine()->getManager();
        $templateName = $request->get('name');
        $orientation = $request->get('orientation');
        $template = $em->getRepository(template::class)->findAll();

        $entityManager = $this->getDoctrine()->getManager('addons');
        $allIncrustes = $entityManager->getRepository(Incruste::class)->findAll();

        $incrusteCSSHandler = new IncrusteCSSHandler($allIncrustes);

        $incrustesCSS = $incrusteCSSHandler->getGeneratedCSS();
        $classNames = $incrusteCSSHandler->getClassNames();

        $rupturesSamples = ['il_revient_small', 'il_revient_medium','il_revient_big','indisponible_small','indisponible_medium','indisponible_big'];
        foreach($rupturesSamples as $indexRupture=>$rupture){
            $ressources['medias']['ruptures'][]=[
                'id' => $indexRupture,
                'ext' => 'png',
                'filename' => $rupture
            ];
        }



        return $this->render('template/stages/index.html.twig', [
            'controller_name'    => 'TemplateController',
            'templateName'       => $templateName,
            'orientation'        => $orientation,
            'stageNumber'        => 2,
            'textIncrustesCSS'   => $incrustesCSS,
            'classNames'         => $classNames,
            'ressources'        => $ressources
        ]);
    }

    /**
     * @Route("/template/stage2/getstyles", name="templateStage2getStyles",methods="POST")
     */
    public function stage2Open(SerializerInterface $serialize, ParameterBagInterface $parameterBag, CSSParser $CSSParser)
    {

       $CSSContent = $CSSParser->parseCSS($parameterBag->get('kernel.project_dir').'/public/css/template/tools/zone_container_editor/text_styles/text-styles.css');

        $serializedCSS = $serialize->serialize($CSSContent,'json');

        return new Response($serializedCSS);
    }

    /**
     * @Route("/template/create/{name}/{format}", name="templateCreation",requirements={
     *   "format" = "H|V"
     * })
     */
    public function create($name,$format)
    {

        return $this->render('template/creation.html.twig', [
            'controller_name' => 'TemplateController',
            'templateName'   => $name,
            'templateFormat' => $format,
        ]);
    }
}
