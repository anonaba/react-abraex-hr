cd /home/staging-react
npm install
CI=false npm run build
cp -r /home/staging-react/build/* /home/staging/src/ui/
pm2 flush
pm2 restart abraex-staging