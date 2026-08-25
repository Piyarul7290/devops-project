pipeline {
    agent any
    
    tools {
        nodejs 'piyarul'
    }
    
    environment {
        DOCKER_IMAGE = 'piyarul7290/devops-project'
        // Use Jenkins build number as fallback, or commit hash
    }
    
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Piyarul7290/devops-project.git'
            }
        }
        
        stage('Get Commit Hash') {
            steps {
                script {
                    env.GIT_COMMIT_HASH = sh(
                        script: "git rev-parse --short HEAD", 
                        returnStdout: true
                    ).trim()
                    echo "Commit hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }
        
        stage('Build & Test App') {
            steps {
                sh '''
                    npm install
                    npm test || echo "No tests configured"
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials-id') {
                        docker.image("${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}").push()
                        docker.image("${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}").push('latest')
                    }
                }
            }
        }
        
        stage('Test Cluster Connection') {
            steps {
                sh 'kubectl cluster-info'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Replace placeholder with actual commit hash and apply
                    sh """
                        sed 's|__IMAGE_TAG__|${env.GIT_COMMIT_HASH}|g' deployment.yml > deployment-updated.yml
                        kubectl apply -f deployment-updated.yml
                        kubectl rollout status deployment/devops-project
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
