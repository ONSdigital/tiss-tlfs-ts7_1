#--------------------------------------------------
# R Haycock
# Cypress Job YAML Creator + command hooks
# 04/11/2021
#--------------------------------------------------
import datetime
import subprocess
import argparse

# All set to required=false so without any args will run with the defaults unless defined
# e.g. build_yaml.py --nodes 2 --scope "cypress/e2e/LMS/online_hh_p13_en.js,cypress/e2e/LMS/online_hh_3_ni.js" --branch rich-dev
p = argparse.ArgumentParser(description='INFO: Runs a K8 Job')
p.add_argument("--nodes", type=int, default=6,help='Number of Pods', required=False)
p.add_argument("--browser", type=str, default='chrome',help='chrome, firefox, edge', required=False)
p.add_argument("--scope", type=str, default='cypress/e2e/LMS/online_hh_*.js',help='Script Scope (wildcard)', required=False)
p.add_argument("--branch", type=str, default='develop',help='The branch name', required=False)
p.add_argument("--cmesg", type=str, default='LMS Online Regression',help='Commit Message, e.g. LMS Online Regression v26', required=False)
p.add_argument("--group", type=str, default='LMS_Online',help='Group name (e.g. Online/TO)', required=False)
p.add_argument("--pid", type=str, default='1uepii',help='Project ID in Dashboard', required=False)
p.add_argument("--key", type=str, default='747cd087-ee19-4336-a471-1f37f0179802',help='Record Key in Dashboard', required=False)
p.add_argument("--run", type=str, default='Y',help='Run Job Y/N', required=False)
p.add_argument("--ver", type=str, default='8.7.0',help='Cypress Version', required=False)
p.add_argument("--cauth", type=str, default='K8 Automated Job',help='Commit Author', required=False)
args = p.parse_args()

yaml_in = "yaml_templates/cypress_job.yaml"
yaml_out = "cypress_job.yaml"
proxy = "http://34.105.195.115:3128"
timestamp = datetime.datetime.now().strftime("%d/%m/%Y-%H:%M:%S")

run_job = args.run
branch = args.branch
cy_version = args.ver
nodes = args.nodes
browser = args.browser
scope = args.scope
group = args.group
commit_message = args.cmesg
commit_author = args.cauth
project_id = args.pid
record_key = args.key

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




