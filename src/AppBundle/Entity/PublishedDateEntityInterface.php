<?php


namespace AppBundle\Entity;


interface PublishedDateEntityInterface
{
        public function setPublished(\DateTimeInterface $published): PublishedDateEntityInterface;
}