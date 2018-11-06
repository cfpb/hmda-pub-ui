podTemplate(label: 'buildDockerContainer', containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm', ttyEnabled: true, command: 'cat')
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]) {
   node('buildDockerContainer') {
     def repo = checkout scm
     def gitCommit = repo.GIT_COMMIT
     def gitBranch = repo.GIT_BRANCH
     def gitTag = repo.GIT_TAG
     def shortGitCommit = "${gitCommit[0..10]}"

    stage('Build And Publish Docker Image') {
      container('docker') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'hmda-platform-jenkins-service',
              usernameVariable: 'DTR_USER', passwordVariable: 'DTR_PASSWORD']]) {
              withCredentials([string(credentialsId: 'internal-docker-registry', variable: 'DOCKER_REGISTRY_URL')])
              if (gitTag != "" or gitBranch == "v2") {
                if (gitBranch == "v2") {
                  def dockerTag = "latest"
                } else {
                  def dockerTag = gitTag
                }
                sh "docker build --rm -t=${env.DOCKER_HUB_USER}/hmda-pub-ui ."
                sh "docker tag ${env.DOCKER_HUB_USER}/hmda-pub-ui ${env.DOCKER_HUB_USER}/hmda-pub-ui:${dockerTag}"
                sh "docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD} "
                sh "docker push ${env.DOCKER_HUB_USER}/hmda-pub-ui:${dockerTag}"
                sh "docker tag ${env.DOCKER_HUB_USER}/hmda-pub-ui:${dockerTag} ${DOCKER_REGISTRY_URL}/${env.DOCKER_HUB_USER}/hmda-pub-ui:${dockerTag}"
                sh "docker login ${DOCKER_REGISTRY_URL} -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD} "
                sh "docker push ${DOCKER_REGISTRY_URL}/${env.DOCKER_HUB_USER}/hmda-pub-ui:${dockerTag}"
              }
            }
        }
      }

    stage('Deploy') {
      if (env.BRANCH_NAME == 'v2') {
        container('helm') {
          sh "helm upgrade --install --force \
          --namespace=default \
          --values=kubernetes/hmda-pub-ui/values.yaml \
          --set image.tag=${gitBranch} \
          hmda-pub-ui \
          kubernetes/hmda-pub-ui"
        }
      }
    }

  }

}
