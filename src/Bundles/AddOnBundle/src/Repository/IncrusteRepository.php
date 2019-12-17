<?php

namespace AddOn\Repository;

use AddOn\Entity\Incruste;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Incruste|null find($id, $lockMode = null, $lockVersion = null)
 * @method Incruste|null findOneBy(array $criteria, array $orderBy = null)
 * @method Incruste[]    findAll()
 * @method Incruste[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IncrusteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Incruste::class);
    }

    public function findAllIncrustsWithoutChildrens()
    {
        return $this->createQueryBuilder('i')
            ->leftJoin('i.incrusteElements','e')
            ->where('e.parent = :val')
            ->setParameter('val', 173)
            ->getQuery()
            ->getResult()
            ;
    }
    // /**
    //  * @return Incruste[] Returns an array of Incruste objects
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
    public function findOneBySomeField($value): ?Incruste
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
