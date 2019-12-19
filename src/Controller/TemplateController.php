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
     * @Route("/template/cssloader/{type}", name="cssLoader",methods="GET")
     */
    public function loadCss($type)
    {
        $entityManager = $this->getDoctrine()->getManager('addons');
        $allIncrustes = $entityManager->getRepository(Incruste::class)->findBy(['type' => $type ]);

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

        function registerIncrustElement($incrustElement,$incrustParent,$em,$parentIncrustElement=false){
            $type =  $incrustElement['_type'] ;
            $className = $type . $incrustParent->getId();

            $newIncrusteElement = new IncrusteElement();
            $incrustParent->addIncrusteElement($newIncrusteElement);

            $newIncrusteElement->setType($type);
            $newIncrusteElement->setContent($incrustElement['_content']);
            $newIncrusteElement->setClass($className);

            $newIncrusteElement->setIncrustOrder($incrustElement['_incrustOrder']);
            if($parentIncrustElement)$parentIncrustElement->addChild($newIncrusteElement);

            foreach($incrustElement['_style'] as $incrusteStyle){
                $property = $em->getRepository(CSSProperty::class)->findOneBy(['name'=>$incrusteStyle['name']]);

                if($property !== NULL && $incrusteStyle['propertyWritting'] !== NULL){

                    $incrusteContentStyle = new IncrusteStyle();
                    $incrusteContentStyle->setProperty($property);
                    $incrusteContentStyle->setValue($incrusteStyle['propertyWritting']);
                    $newIncrusteElement->addIncrusteStyle($incrusteContentStyle);
                    $em->persist($incrusteContentStyle);

                }
            }
            if(isset($incrusteContentStyle) && $incrusteContentStyle instanceof IncrusteStyle){
                $em->persist($newIncrusteElement);

                foreach($incrustElement['_subContents'] as $subIncrustContent){
                    registerIncrustElement($subIncrustContent,$incrustParent,$em,$newIncrusteElement);
                }
            }
        }

        function buildPropertiesArray($propertiesList,$object){
            $propertiesValuesArray = [];
            foreach($propertiesList as $property){
                $getter = 'get'.ucfirst($property);
                if(method_exists($object,$getter))$propertiesValuesArray[$property] = $object->$getter() ;
            }
            return $propertiesValuesArray;
        }


        $entityManager = $this->getDoctrine()->getManager('addons');
        $incrusteStyle = json_decode($request->get('incrusteStyle'),true);


        $incrusteResponse = [];
        $newIncruste = new Incruste();

        $newIncruste    ->setName($incrusteStyle['_name'])
                        ->setType($incrusteStyle['_type']);

        $incrusteResponse['name'] = $newIncruste->getName();
        $incrusteResponse['type'] = $newIncruste->getType();
        $entityManager->persist($newIncruste);
        $entityManager->flush();

        foreach($incrusteStyle['_incrusteElements'] as $content){
            registerIncrustElement($content,$newIncruste,$entityManager);
        }



        $entityManager->persist($newIncruste);


        $entityManager->flush();





        if($newIncruste->getId() !== null) {
            $incrusteCreated = buildPropertiesArray(['id', 'name', 'type'], $newIncruste);
            $incrusteCreated['incrusteElements'] = [];

            foreach ($newIncruste->getIncrusteElements() as $incrustElement) {
                if ($incrustElement->getId() !== null) {
                    $incrusteCreated['incrusteElements'][] = buildPropertiesArray(['id', 'type', 'content', 'class','incrustOrder'], $incrustElement);
                }
            }
        }

        return new Response(json_encode($incrusteCreated));
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


        $allIncrusteSortedByType = $classNames = [];

        foreach($allIncrustes as $incruste){ $allIncrusteSortedByType[ $incruste->getType() ][]=$incruste; }

        foreach($allIncrusteSortedByType as $type => $incrusteList){
                $incrusteCSSHandler = new IncrusteCSSHandler($incrusteList);
                $classNames[$type] = $incrusteCSSHandler->getIncrustesAndElementsClasses();

        }

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
