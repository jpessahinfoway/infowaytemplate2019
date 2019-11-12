<?php

namespace App\Controller;
require __DIR__.'/../../vendor/autoload.php';

use AddOn\Entity\Model;
use AddOn\Entity\Style;
use App\Entity\Template;
use App\Entity\Zone;
use App\Service\CSSParser;
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
     * @Route("/template/stage1/model/register", name="registerModel",methods="GET")
     */
    public function registerModel(Request $request,ParameterBagInterface $parameterBag, CSSParser $CSSParser){

        $response = [
            "error" => false ,
            "newClass" => null
        ];

        $CSSContent = $CSSParser->parseCSS($parameterBag->get('kernel.project_dir').'/public/css/template/tools/zone_container_editor/text_styles/text-styles.css');

        $propertyAccessor = PropertyAccess::createPropertyAccessor();
        $newIncrusteStyles = json_decode($request->get('newStyles'),true);

        $entityManager = $this->getDoctrine()->getManager('addons');

        $newModel = new Model();
        $newModel->setName($newIncrusteStyles['name']);
        $newModel->setNameclass($newIncrusteStyles['type']);
        $newModel->setType($newIncrusteStyles['type']);

        $entityManager->persist($newModel);
        $entityManager->flush();

        $modelId = $newModel->getId();
        $newIncrusteIndice = $newIncrusteStyles['type'] . $modelId;
        $newModel->setIndice($newIncrusteIndice);


        $modelCss = '';


        foreach($newIncrusteStyles['styles'] as $incrusteStyleName => $incrusteStyle){
            $modelCss .= '.'.$newIncrusteIndice.' {';

            $newStyle = new Style();
            $newStyle-> setName($incrusteStyleName);
            $newStyle->setModel($newModel);

            $styleCss = '';

            foreach($incrusteStyle as  $incrusteStyleProperty){
                $modelCss.= $incrusteStyleProperty['name'] . ' : ' . $incrusteStyleProperty['propertyWritting'] . ' ; ';
                $styleCss.= $incrusteStyleProperty['name'] . ' : ' . $incrusteStyleProperty['propertyWritting'] . ' ; ';
            }

            $newStyle->setName($incrusteStyleName);
            $newStyle->setContent($styleCss);


            $entityManager->persist($newStyle);

            $response['newClass']['name']=$newIncrusteStyles['name'];
            $response['newClass']['content'][$incrusteStyleName] = $newIncrusteIndice;

            $CSSParser->addClass($newIncrusteStyles['type'] . $modelId,$styleCss);
            $modelCss.= '}';
        }


        $newModel->setCss($modelCss);

        $entityManager->persist($newModel);
        $entityManager->flush();



        //var_dump($propertyAccessor->getValue($models,'[styles]'));

      /*  return $this->render('template/test.html.twig', [
            'controller_name' => 'TemplateController',
            'styles' => $newIncrusteStyles,
            'cssContent' => $CSSContent
        ]);*/

      return new Response(json_encode($response));
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
        $em = $this->getDoctrine()->getManager();
        $templateName = $request->get('name');
        $orientation = $request->get('orientation');
        $template = $em->getRepository(template::class)->findAll();

        return $this->render('template/stages/index.html.twig', [
            'controller_name' => 'TemplateController',
            'templateName'    => $templateName,
            'orientation'     => $orientation,
            'stageNumber'     => 2,
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
