pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image......"
            }
        }
        stage('Deploying to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes......"
            }
        }
    }
    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}