import shutil
import argparse
import os.path
import glob

p = argparse.ArgumentParser(description='Copies the Pre Prod Launch files for TO scripts')
p.add_argument('--tests', type=int, default=2,help='Number of test files - returned from pipe', required=False)
p.add_argument('--srcpath', type=str, default='/e2e/cypress/e2e/LMS/PreProd/TO/', help='Source path for template file', required=False)
p.add_argument('--destpath', type=str, default='/e2e/cypress/e2e/LMS/PreProd/TO/', help='Destination path for template file', required=False)
args = p.parse_args()

src_path = args.srcpath
dest_path = args.destpath
tests = args.tests

for f in glob.glob('pp_TO_Launch_dashboard*.js'):
    os.remove(f)

for i in range(0,(tests)):
    shutil.copyfile(
        src_path + 'pp_TO_Launch_dashboard.js',
        dest_path +'pp_TO_Launch_dashboard_{}.js'.format(i))