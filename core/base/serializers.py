from rest_framework import serializers

from .models import CustomUser,Imageresize


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=128,min_length=3,write_only=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
    
    def create(self,validated_data):
        return CustomUser.objects.create_user(**validated_data)



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imageresize
        fields ='__all__'

    # def save(self,*args,**kwargs):
    #     return Imageresize.objects.save(*args,**kwargs)    
    # def save(self,validated_data):
    #     return Imageresize.objects.save(**validated_data)