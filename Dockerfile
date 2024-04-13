FROM postgres:latest

# RUN echo "@!# Hello from Dockerfile !#@"

RUN apt-get update && apt-get -y install git build-essential postgresql-server-dev-16

RUN localedef -i en_US -f UTF-8 en_US.UTF-8

RUN git clone https://github.com/citusdata/pg_cron.git
RUN cd pg_cron && make && make install


# Добавление расширения pg_cron в базу данных
# RUN echo "shared_preload_libraries = 'pg_cron'" >> /var/lib/postgresql/data/postgresql.conf
# RUN echo "cron.database_name = 'nestjs'" >> /var/lib/postgresql/data/postgresql.conf

# Вывод содержимого postgresql.conf
# CMD cat /var/lib/postgresql/data/postgresql.conf
