INSERT INTO public.parameters
("key", value, created_at)
VALUES('cluster_id', '01c0e21c-4071-4d35-9764-f9431902a0fd', NULL);


INSERT INTO public.services
(id, created_at, updated_at, "name", retries, protocol, host, port, "path", connect_timeout, write_timeout, read_timeout, tags, client_certificate_id, tls_verify, tls_verify_depth, ca_certificates, ws_id)
VALUES('2557ef66-85bc-4293-a8bb-04d80d87139a'::uuid, '2022-03-03 22:31:38.000', '2022-03-03 22:31:38.000', 'Auth_Validation', 5, 'http', 'boaentrega_ms_authv', 9191, '/', 60000, 60000, 60000, '{}', NULL, NULL, NULL, NULL, 'f838dda5-f284-4715-a5b5-126181021858'::uuid);
INSERT INTO public.services
(id, created_at, updated_at, "name", retries, protocol, host, port, "path", connect_timeout, write_timeout, read_timeout, tags, client_certificate_id, tls_verify, tls_verify_depth, ca_certificates, ws_id)
VALUES('13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '2022-03-03 22:32:10.000', '2022-03-03 22:32:10.000', 'Suppliers', 5, 'http', 'boaentrega_ms_supplier', 9194, '/', 60000, 60000, 60000, '{}', NULL, NULL, NULL, NULL, 'f838dda5-f284-4715-a5b5-126181021858'::uuid);



INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('48954b0a-881e-4c28-b903-8cd3013a3c4f'::uuid, '2022-03-03 22:32:48.000', '2022-03-03 22:32:48.000', NULL, '2557ef66-85bc-4293-a8bb-04d80d87139a'::uuid, '{"http","https"}', '{"POST"}', NULL, '{"/authv/v1/validate"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('77937d82-4052-4912-b00a-07425f419675'::uuid, '2022-03-03 22:34:10.000', '2022-03-03 22:34:10.000', NULL, '13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '{"http","https"}', '{"GET"}', NULL, '{"/supplier/v1/"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('cbc09f29-cf00-4242-98b0-bac50044cb11'::uuid, '2022-03-03 22:34:39.000', '2022-03-03 22:34:39.000', NULL, '13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '{"http","https"}', '{"GET"}', NULL, '{"/supplier/v1/{document}"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('e2e300dc-8a5c-4172-a488-d62a67316073'::uuid, '2022-03-03 22:35:01.000', '2022-03-03 22:35:01.000', NULL, '13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '{"http","https"}', '{"DELETE"}', NULL, '{"/{id}"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('27f523e6-5640-4479-b3d5-de6750e69509'::uuid, '2022-03-03 22:35:40.000', '2022-03-03 22:35:40.000', NULL, '13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '{"http","https"}', '{"POST"}', NULL, '{"/supplier/v1/"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
INSERT INTO public.routes
(id, created_at, updated_at, "name", service_id, protocols, methods, hosts, paths, snis, sources, destinations, regex_priority, strip_path, preserve_host, tags, https_redirect_status_code, headers, path_handling, ws_id, request_buffering, response_buffering)
VALUES('30b67ab1-d39a-4015-b620-257f6c86671f'::uuid, '2022-03-03 22:36:23.000', '2022-03-03 22:36:23.000', NULL, '13ad0a99-b095-4253-86de-a0d3fa1ad105'::uuid, '{"http","https"}', '{"PATCH"}', NULL, '{"/supplier/v1/"}', NULL, NULL, NULL, 0, false, false, NULL, 426, NULL, 'v1', 'f838dda5-f284-4715-a5b5-126181021858'::uuid, true, true);
