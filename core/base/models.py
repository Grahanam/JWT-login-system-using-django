from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from PIL import Image
import random
import os
import uuid

class MyAccountManager(BaseUserManager):

    def create_user(self,email,password=None):
        if not email:
            raise ValueError("Users must have an email address")
        user=self.model(
            email=self.normalize_email(email),

        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,password):
        user=self.create_user(
            email=self.normalize_email(email),
            password=password 
        )    
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self.db)
        return user

class CustomUser(AbstractBaseUser):
     email          =models.EmailField(verbose_name="email",max_length=60,unique=True)
     date_joined    =models.DateTimeField(verbose_name="date joined",auto_now_add=True)
     last_login     =models.DateTimeField(verbose_name="last login",auto_now=True)
     is_admin       =models.BooleanField(default=False)
     is_active      =models.BooleanField(default=True)
     is_admin       =models.BooleanField(default=False)
     is_staff       =models.BooleanField(default=False)
     is_superuser   =models.BooleanField(default=False)

     objects=MyAccountManager()
     USERNAME_FIELD='email'

     def __str__(self):
        return self.email

     def has_perm(self,perm,obj=None):
        return self.is_admin

     def has_module_perms(self,app_label):
        return True


def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])

def photo_path(instance, filename):
    basefilename, file_extension= os.path.splitext(filename)
    chars= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    randomstr= ''.join((random.choice(chars)) for x in range(10))
    return 'images/{basename}{randomstring}{ext}'.format( basename= basefilename, randomstring= randomstr, ext= file_extension)    
         
class Imageresize(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    thumbnail=models.ImageField(upload_to=photo_path,null=True)
    medium=models.ImageField(upload_to=photo_path,null=True)
    large=models.ImageField(upload_to=photo_path,null=True)
    grayscale=models.ImageField(upload_to=photo_path,null=True)

    def __str__(self):
        return f'Imageresize'
    
    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)
        
        LARGE=1024,768
        img=Image.open(self.large.path)
        if img.height>768 or img.width>1024:
#using img.thumbnail maintains the original aspect while img.resize can lead to stretched or squished image result.        
            # img.thumbnail(LARGE,Image.ANTIALIAS)
            # img.save(self.large.path)
            img_resize_large=img.resize(LARGE,Image.ANTIALIAS)
            img_resize_large.save(self.large.path)      
    
        MEDIUM_SIZE=500,500
        img=Image.open(self.medium.path)
        if img.height>500 or img.width>500:
            # img.thumbnail(MEDIUM_SIZE,Image.ANTIALIAS)
            # img.save(self.medium.path) 
            img_resize_medium=img.resize(MEDIUM_SIZE,Image.ANTIALIAS)
            img_resize_medium.save(self.medium.path) 

        THUMNAIL_SIZE=200,300    
        img=Image.open(self.thumbnail.path)
        if img.height>300 or img.width>200:
            # img.thumbnail(THUMNAIL_SIZE,Image.ANTIALIAS)
            # img.save(self.thumbnail.path)
            img_resize_large=img.resize(THUMNAIL_SIZE,Image.ANTIALIAS)
            img_resize_large.save(self.thumbnail.path)
        
        img=Image.open(self.grayscale.path)
        greyscale_image = img.convert('L')
        greyscale_image.save(self.grayscale.path)
        