FROM openjdk:17

EXPOSE 8080
LABEL maintainer="chr.diesner@mailbox.org"
ADD /backend/target/GolfApp.jar GolfApp.jar
CMD [ "sh", "-c", "java -jar /GolfApp.jar"]