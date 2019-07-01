<?php


namespace AppBundle\Security;

//use AppBundle\Exception\InvalidConfirmationTokenException;
use AppBundle\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use AppBundle\Entity\User;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use AppBundle\Entity\BlogPost;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\VarDumper\VarDumper;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class UserConfirmationService
{
//    /**
//     * @var UserRepository
//     */
//    private $userRepository;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

//    /**
//     * @var LoggerInterface
//     */
//    private $logger;

    public function __construct(
//        UserRepository $userRepository,
//        LoggerInterface $logger,
        EntityManagerInterface $entityManager
    )
    {
//        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
//        $this->logger = $logger;
    }

    public function confirmUser(string $confirmationToken)
    {
//        $user=$this->userRepository->findOneBy(['confirmationToken'=> $confirmationToken]);

        $user=$this->entityManager->getRepository(User::class)->findOneBy(['confirmationToken'=> $confirmationToken]);

//        $repository = $this->getDoctrine()->getRepository(User::class);
//        $user = $repository->findOneBy(['confirmationToken'=> $confirmationToken->confirmationToken]);

        if(!$user)
        {
          throw new NotFoundHttpException();
        }

        $user->setEnabled(true);
        $user->setConfirmationToken(null);
        $this->entityManager->flush();
    }

}