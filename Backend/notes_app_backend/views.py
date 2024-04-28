from rest_framework import generics, status
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list(self, request, *args, **kwargs):
        return Response({
            "message": "Note list retrieved successfully",
            "data": self.get_serializer(self.get_queryset(), many=True).data
        }, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "message": "Note created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

class NoteRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response({
            "message": "Note retrieved successfully",
            "data": self.get_serializer(instance).data
            
        }, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "message": "Note updated successfully",
            "data": serializer.data    
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "message": "Note deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)

