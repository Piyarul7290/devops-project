pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'piyarul7290/devops-project'
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
                        echo $PASSWORD | docker login \
                        -u $USERNAME \
                        --password-stdin
                        docker push piyarul7290/devops-project:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f deployment.yml"
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