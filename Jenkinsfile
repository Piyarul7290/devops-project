pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'Piyarul7290/devops-project'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Piyarul7290/devops-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-pipeline',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                     	sh '''
            		echo $PASSWORD | docker login -u $USERNAME --password-stdin
            		docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
            		'''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f deployment.yml"
                sh "kubectl set image deployment/devops-project devops-project=${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! ✅'
        }

        failure {
            echo 'Pipeline failed! ❌'
        }
    }
} 
