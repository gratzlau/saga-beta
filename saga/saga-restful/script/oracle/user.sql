create table USERS
(
  id		      VARCHAR2(32) not null,
  userName            VARCHAR2(16),
  passWord	      VARCHAR2(32),
  user_sex	      VARCHAR2(32),
  nick_name           VARCHAR2(32)
);
alter table USERS
  add constraint PRI_USERS primary key (id);

-- Add comments to the columns 
comment on column users.id
  is '任务id';


-- Create sequence 
create sequence SEQ_TAB_ID
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 20
cycle;


truncate table users;

drop sequence SEQ_TAB_ID;
-- Create sequence 
create sequence SEQ_TAB_ID
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 20
cycle;