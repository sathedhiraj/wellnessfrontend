pipeline {
    agent any

    environment {
        REPO_URL = "https://github.com/sathedhiraj/wellnessfrontend.git"
        APP_DIR = "/home/ubuntu/wellnessfrontend"
    }

    stages {

        stage('Update Packages') {
            steps {
                sh '''
                sudo apt-get update
                '''
            }
        }

        stage('Install Required Packages') {
            steps {
                sh '''
                sudo apt-get install -y nginx git curl
                '''
            }
        }

        stage('Install Docker') {
            steps {
                sh '''
                curl -fsSL https://get.docker.com | sh
                '''
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                sudo apt-get install -y nodejs
                '''
            }
        }

        stage('Clone Repository') {
            steps {
                sh '''
                rm -rf ${APP_DIR}
                git clone ${REPO_URL} ${APP_DIR}
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd ${APP_DIR}
                npm install
                '''
            }
        }

        stage('Build Next.js') {
            steps {
                sh '''
                cd ${APP_DIR}
                npm run build
                '''
            }
        }
    }

    post {
        success {
            echo "Frontend Build Successful"
        }

        failure {
            echo "Frontend Build Failed"
        }
    }
}
