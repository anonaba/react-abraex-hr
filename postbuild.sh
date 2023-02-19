cd /home/abraex-react
npm install
CI=false npm run build
cp -r /home/abraex-react/build/* /home/abraex/src/ui/
pm2 flush
pm2 restart abraex