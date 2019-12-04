<?php
/**
 * Created by PhpStorm.
 * User: Serge
 * Date: 22/11/2019
 * Time: 12:36
 */

namespace App\Service;


use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class IncrusteCSSHandler
{

    private $_generatedCSS;

    private $_incrustes;

    private $_serializer;

    private $_classNames = [];

    public function __construct($incrustes)
    {
        $this->_incrustes = $incrustes;
        $this->_parsedIncrustes = [];

        $this->buildParsedincrustes();
        $this->generateCSS();
    }

    public function generateSerializer(){
        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);

        $this->_serializer = new Serializer([$normalizer], [$encoder]);
    }

    public function buildParsedincrustes(){
        $this->generateSerializer();
        $this->_parsedIncrustes = json_decode($this->_serializer->serialize($this->_incrustes, 'json'));

    }

    /**
     * @return array
     */
    public function getClassNames(): array
    {
        return $this->_classNames;
    }

    /**
     * @param array $classNames
     */
    public function setClassNames(array $classNames): void
    {
        $this->_classNames = $classNames;
    }
    public function generateCSS(){
        foreach($this->_incrustes as $incruste){
            $incrusteElements = $incruste->getIncrusteElements();
            foreach($incrusteElements as $incrusteElement){
                $className = $incrusteElement->getType() . $incruste->getId();
                $this->_classNames[] = [
                    'name' => $className,
                    'id'   => $incruste->getId()
                ];

                $this->_generatedCSS .= ".$className { ";

                foreach ($incrusteStyles = $incrusteElement->getIncrusteStyles() as $incrusteStyle){
                    $this->_generatedCSS .= $incrusteStyle->getProperty()->getName() .' : ' . $incrusteStyle->getValue() .' ; ';
                }

                $this->_generatedCSS .= ' } ';
            }
        }
    }

    /**
     * @return array
     */
    public function getParsedIncrustes(): array
    {
        return $this->_parsedIncrustes;
    }

    /**
     * @param array $parsedIncrustes
     */
    public function setParsedIncrustes(array $parsedIncrustes): void
    {
        $this->_parsedIncrustes = $parsedIncrustes;
    }

    /**
     * @return mixed
     */
    public function getGeneratedCSS()
    {
        return $this->_generatedCSS;
    }

    /**
     * @param mixed $generatedCSS
     */
    public function setGeneratedCSS($generatedCSS): void
    {
        $this->_generatedCSS = $generatedCSS;
    }

    /**
     * @return mixed
     */
    public function getIncrustes()
    {
        return $this->_incrustes;
    }

    /**
     * @param mixed $incrustes
     */
    public function setIncrustes($incrustes): void
    {
        $this->_incrustes = $incrustes;
    }



}