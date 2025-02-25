pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "node-demo-image"  // Base image name without the tag
    }

    stages {
        stage('Get Previous Tag') {
            steps {
                script {
                    def previousTag
                    try {
                        previousTag = sh(script: "git describe --tags --abbrev=0", returnStdout: true).trim()
                    } catch (Exception e) {
                        previousTag = "0.0.0"  // Default version if no tags exist
                    }
                    
                    // Extract major, minor, and patch
                    def versionParts = previousTag.tokenize('.')  // Splitting by dot
                    def major = versionParts[0] as int
                    def minor = versionParts[1] as int
                    def patch = versionParts[2] as int
                    
                    // Get the latest commit message
                    def commitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Commit Message: ${commitMessage}"
                    
                    // Determine version bump
                    if (commitMessage.startsWith('feat:')) {
                        minor += 1
                        patch = 0
                    } else if (commitMessage.startsWith('fix:')) {
                        patch += 1
                    } else if (commitMessage.startsWith('break:')) {
                        major += 1
                        minor = 0
                        patch = 0
                    } else {
                        echo "No valid prefix found. Skipping version bump."
                        return
                    }
                    
                    def newTag = "${major}.${minor}.${patch}"
                    echo "New Tag: ${newTag}"

                    env.NEW_TAG = newTag
                    env.DOCKER_IMAGE_TAG = "${env.DOCKER_IMAGE}:${env.NEW_TAG}"
                    
                    // Tag and push
                    sh "git tag ${newTag}"
                    sh "git push origin ${newTag}"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${env.DOCKER_IMAGE_TAG} ."
                }
            }
        }
        stage('Update Kubernetes Manifest & Deploy') {
            steps {
                script {
                    // Replace the image tag dynamically in the Kubernetes YAML file
                    sh """
                    sed -i 's|image: node-demo-image:.*|image: ${env.DOCKER_IMAGE_TAG}|' k8s-manifest.yaml
                    """

                    // Apply the updated manifest to Kubernetes
                    sh "kubectl apply -f k8s-manifest.yaml"
                }
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