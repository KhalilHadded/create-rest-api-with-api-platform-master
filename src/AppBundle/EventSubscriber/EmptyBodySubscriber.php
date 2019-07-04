<?php


namespace AppBundle\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use AppBundle\Exception\EmptyBodyException;
use Doctrine\ORM\Mapping\Id;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;


class EmptyBodySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => [
                'handleEmptyBody',
                EventPriorities::POST_DESERIALIZE,
            ],
        ];
    }
    public function handleEmptyBody(GetResponseEvent $event)
    {
        $test='ok';


        $request = $event->getRequest();
        $method = $request->getMethod();
        $type=$request->getContentType();
        $route = $request->get('_route');



        if ( !((Request::METHOD_POST==$method)||(Request::METHOD_PUT==$method) ) ) {

            return;
        }

        if ( $type=='html'||($type=='form') ) {

            return;
        }

        if ( substr($route, 0, 3) !== 'api' ) {

            return;
        }

        if ( substr($route, 0, 10) == 'api_images' ) {

            return;
        }


//        var_dump($test);die;



        $data = $event->getRequest()->get('data');



        if (null === $data) {
            throw new EmptyBodyException();
        }

    }

}