pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                pwd
                ls -la
                git --version
                node -v
                npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js') {
            steps {
                sh 'npm run build'
            }
        }
    }

       stage('Start Application') {
         steps {
           sh '''
           pkill -f "next start" || true
          nohup npm start > app.log 2>&1 &
           '''
    }
}

}
        
    

    post {
        success {
            echo '✅ Frontend Build Successful'
        }

        failure {
            echo '❌ Frontend Build Failed'
        }

    }
}
