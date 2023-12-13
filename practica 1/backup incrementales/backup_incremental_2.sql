# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#231211 23:59:04 server id 1  end_log_pos 126 CRC32 0x869d1c1f 	Start: binlog v 4, server v 8.0.35 created 231211 23:59:04
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
qPZ3ZQ8BAAAAegAAAH4AAAABAAQAOC4wLjM1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAR8cnYY=
'/*!*/;
# at 126
#231211 23:59:04 server id 1  end_log_pos 157 CRC32 0xd4c6e931 	Previous-GTIDs
# [empty]
# at 157
#231211 23:59:20 server id 1  end_log_pos 236 CRC32 0x8f187998 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1702360760972486	immediate_commit_timestamp=1702360760972486	transaction_length=701
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1702360760972486 (2023-12-11 23:59:20.972486 Hora estándar, América Central)
# immediate_commit_timestamp=1702360760972486 (2023-12-11 23:59:20.972486 Hora estándar, América Central)
/*!80001 SET @@session.original_commit_timestamp=1702360760972486*//*!*/;
/*!80014 SET @@session.original_server_version=80035*//*!*/;
/*!80014 SET @@session.immediate_server_version=80035*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 236
#231211 23:59:20 server id 1  end_log_pos 316 CRC32 0x878bf8e6 	Query	thread_id=49	exec_time=0	error_code=0
SET TIMESTAMP=1702360760/*!*/;
SET @@session.pseudo_thread_id=49/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 316
#231211 23:59:20 server id 1  end_log_pos 385 CRC32 0x9267e236 	Table_map: `practica1`.`habitacion` mapped to number 690
# has_generated_invisible_primary_key=0
# at 385
#231211 23:59:20 server id 1  end_log_pos 827 CRC32 0xbb3e5ef6 	Write_rows: table id 690 flags: STMT_END_F

BINLOG '
uPZ3ZRMBAAAARQAAAIEBAAAAALICAAAAAAEACXByYWN0aWNhMQAKaGFiaXRhY2lvbgACAw8CyAAA
AQEAAgP8/wA24meS
uPZ3ZR4BAAAAugEAADsDAAAAALICAAAAAAEAAgAC/wABAAAAE1NhbGEgZGUgZXhhbWVuZXMgMQ0A
AgAAABNTYWxhIGRlIGV4YW1lbmVzIDINAAMAAAATU2FsYSBkZSBleGFtZW5lcyAzDQAEAAAAE1Nh
bGEgZGUgZXhhbWVuZXMgNA0ABQAAABNTYWxhIGRlIGltYWdlbmVzIDENAAYAAAAZU2FsYSBkZSBw
cm9jZWRpbWllbnRvcyAxDQAHAAAAGVNhbGEgZGUgcHJvY2VkaW1pZW50b3MgMg0ACAAAABlTYWxh
IGRlIHByb2NlZGltaWVudG9zIDMNAAkAAAAZU2FsYSBkZSBwcm9jZWRpbWllbnRvcyA0DQAKAAAA
ClJlY2VwY2lvbg0ACwAAAAxMYWJvcmF0b3Jpbw0ADAAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7Nu
IDENAA0AAAAZRXN0YWNpw7NuIGRlIHJldmlzacOzbiAyDQAOAAAAGUVzdGFjacOzbiBkZSByZXZp
c2nDs24gMw0ADwAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7NuIDQN9l4+uw==
'/*!*/;
# at 827
#231211 23:59:20 server id 1  end_log_pos 858 CRC32 0x0d475fe0 	Xid = 354654
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
