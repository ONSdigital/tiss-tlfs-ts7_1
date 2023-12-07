
#--------------------------------------------------
# R Haycock
# Cypress Job YAML Creator
# 25/10/2021
#--------------------------------------------------
import datetime
import subprocess

# yaml_in = "automation/src/tests/cypress/cypress/yaml_job_runner/yaml_templates/cypress_job.yaml"
# yaml_out = "automation/src/tests/cypress/cypress/yaml_job_runner/cypress_job.yaml"
yaml_in = "yaml_templates/cypress_job.yaml"
yaml_out = "cypress_job.yaml"
timestamp = datetime.datetime.now().strftime("%d/%m/%Y-%H:%M:%S")

run_job = "Y" # run the job in K8 - Y or N (need to be authenticatied... could add this in)

branch = "develop" # git branch to clone
cy_version = "8.7.0" # choose version in the gcp repo
nodes = 6 # Up to ENV limit
browser = "chrome" # chrome, firefox
scope = "cypress/e2e/LMS/online_hh_*.js" # scripts in scope in git directory
#scope = "cypress/e2e/LMS/online_hh_p13_en.js,cypress/e2e/LMS/online_hh_3_ni.js"
group = "LMS_Online" # Online, Telephone, etc
proxy = "http://34.105.195.115:3128"
commit_message = "LMS Online Regression v26"
commit_author = "K8 Automated Job"
project_id = "1uepii" # 1uepii # May need to rotate these as 500 tests/month limit on free
record_key = "747cd087-ee19-4336-a471-1f37f0179802" # 747cd087-ee19-4336-a471-1f37f0179802


with open(yaml_in, 'r') as file:
    filedata = file.read()

newdata = filedata\
.replace("{nodes}", str(nodes))\
.replace("{browser}", browser)\
.replace("{scope}", scope)\
.replace("{timestamp}", timestamp)\
.replace("{commit_message}", commit_message)\
.replace("{commit_author}", commit_author)\
.replace("{project_id}", project_id)\
.replace("{record_key}", record_key)\
.replace("{cy_version}", cy_version)\
.replace("{proxy}", proxy)\
.replace("{group}", group)\
.replace("{branch}", branch)

with open(yaml_out, 'w') as file:
    file.write(newdata)

# user running needs to be authenticated to the cluster, in the real job this will be code-authenticated
if run_job == "Y":
    print("*********************************************************************")
    print("YAML File Created for Job: {}: {}\n".format(commit_message, timestamp))
    print("Running Job: {}: {}".format(commit_message, timestamp))
    subprocess.run(["kubectl", "apply", "-f", "cypress_job.yaml"])
    print("*********************************************************************")
else:
    print("*********************************************************************")
    print("YAML File Created for Job: {}: {}".format(commit_message, timestamp))
    print("*********************************************************************")