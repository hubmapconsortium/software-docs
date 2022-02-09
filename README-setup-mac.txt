Install Ruby 3.x similar to here:  https://jekyllrb.com/docs/installation/macos/
Make sure openssl is installed at /usr/local/opt, like: https://macappstore.org/openssl/
Install eventmachine with:
  export PATH="/usr/local/opt/openssl/bin:$PATH"
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"
  export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"
  gem install eventmachine -v '1.2.7' --source 'https://rubygems.org/'
Then cd to docs and do a:
  bundle install
