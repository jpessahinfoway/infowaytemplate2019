<?php

namespace App\Repository;

use App\Entity\ModelStyle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ModelStyle|null find($id, $lockMode = null, $lockVersion = null)
 * @method ModelStyle|null findOneBy(array $criteria, array $orderBy = null)
 * @method ModelStyle[]    findAll()
 * @method ModelStyle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ModelStyleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ModelStyle::class);
    }

    // /**
    //  * @return ModelStyle[] Returns an array of ModelStyle objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ModelStyle
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
