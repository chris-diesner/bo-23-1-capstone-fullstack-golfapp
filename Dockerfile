FROM openjdk:19

EXPOSE 8080
ADD /backend/target/GolfApp.jar GolfApp.jar
CMD [ "sh", "-c", "java -jar /GolfApp.jar"]