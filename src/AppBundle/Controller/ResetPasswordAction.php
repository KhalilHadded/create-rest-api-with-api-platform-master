<?php


namespace AppBundle\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ResetPasswordAction
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var JWTTokenManagerInterface
     */
    private $tokenManager;

    public function __construct(
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $userPasswordEncoder,
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $tokenManager
    )
    {
        $this->validator = $validator;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->entityManager = $entityManager;
        $this->tokenManager = $tokenManager;
    }
    public function __invoke(User $data)
    {
        // $reset = new ResetPasswordAction();
        // $reset();
//        var_dump(
//            $data->getNewPassword(),
//            $data->getNewRetypedPassword(),
//            $data->getOldPassword(),
//            $data->getRetypedPassword()
//        );
//        die;

        $context['groups'][] = 'put-reset-password';
        $this->validator->validate($data,$context);
        $data->setPassword(
            $this->userPasswordEncoder->encodePassword(
                $data, $data->getNewPassword()
            )
        );

        $data->setPasswordChangeDate(time());
        $this->entityManager->flush();

            $token = $this->tokenManager->create($data);
            return new JsonResponse(['token' => $token]);



//       return $data;
    }

}