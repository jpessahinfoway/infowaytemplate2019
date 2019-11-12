<?php

namespace AddOn\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AddOn\Repository\ModelRepository")
 */
class Model
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $indice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $nameclass;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $css;

    /**
     * @ORM\OneToMany(targetEntity="Style", mappedBy="model",cascade={"persist","remove"})
     */
    private $styles;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $old_indice;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $css_complementaire;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    public function __construct()
    {
        $this->styles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIndice(): ?string
    {
        return $this->indice;
    }

    public function setIndice(?string $indice): self
    {
        $this->indice = $indice;

        return $this;
    }

    public function getNameclass(): ?string
    {
        return $this->nameclass;
    }

    public function setNameclass(?string $nameclass): self
    {
        $this->nameclass = $nameclass;

        return $this;
    }

    public function getCss(): ?string
    {
        return $this->css;
    }

    public function setCss(?string $css): self
    {
        $this->css = $css;

        return $this;
    }

    public function getOldIndice(): ?string
    {
        return $this->old_indice;
    }

    public function setOldIndice(?string $old_indice): self
    {
        $this->old_indice = $old_indice;

        return $this;
    }

    public function getCssComplementaire(): ?string
    {
        return $this->css_complementaire;
    }

    public function setCssComplementaire(?string $css_complementaire): self
    {
        $this->css_complementaire = $css_complementaire;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Style[]
     */
    public function getStyles(): Collection
    {
        return $this->styles;
    }

    public function addStyle(Style $style): self
    {
        if (!$this->styles->contains($style)) {
            $this->styles[] = $style;
            $style->setModel($this);
        }

        return $this;
    }

    public function removeStyle(Style $style): self
    {
        if ($this->styles->contains($style)) {
            $this->styles->removeElement($style);
            // set the owning side to null (unless already changed)
            if ($style->getModel() === $this) {
                $style->setModel(null);
            }
        }

        return $this;
    }
}
