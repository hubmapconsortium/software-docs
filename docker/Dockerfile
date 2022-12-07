FROM ruby:2.7.7
COPY Gemfile ./Gemfile
ADD run-inside-docker.sh /root/run-inside-docker.sh
RUN gem install eventmachine -v '1.2.7' --source 'https://rubygems.org/'
RUN bundle install
EXPOSE 4000
ENTRYPOINT ["/root/run-inside-docker.sh"]


