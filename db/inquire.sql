--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: inquire; Tablespace:
--

CREATE TABLE category (
    id integer NOT NULL,
    name text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.category OWNER TO inquire;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: inquire
--

CREATE SEQUENCE category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO inquire;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inquire
--

ALTER SEQUENCE category_id_seq OWNED BY category.id;


--
-- Name: request; Type: TABLE; Schema: public; Owner: inquire; Tablespace:
--

CREATE TABLE request (
    id integer NOT NULL,
    submit_date timestamp with time zone,
    processed_date timestamp with time zone,
    ineligible boolean,
    name text,
    email text,
    category integer,
    request text,
    contact_okay boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.request OWNER TO inquire;

--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: inquire
--

CREATE SEQUENCE request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.request_id_seq OWNER TO inquire;

--
-- Name: request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inquire
--

ALTER SEQUENCE request_id_seq OWNED BY request.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: inquire; Tablespace:
--

CREATE TABLE "user" (
    email text,
    password text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."user" OWNER TO inquire;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: inquire
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO inquire;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inquire
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: inquire
--

INSERT INTO "user" (id, email, password) VALUES (1, 'admin@test.com', '1234');

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: inquire
--

INSERT INTO "category" (id, name) VALUES (1, 'Category 1');
INSERT INTO "category" (id, name) VALUES (2, 'Category 2');
INSERT INTO "category" (id, name) VALUES (3, 'Category 3');
INSERT INTO "category" (id, name) VALUES (4, 'Category 4');
INSERT INTO "category" (id, name) VALUES (5, 'Category 5');
INSERT INTO "category" (id, name) VALUES (6, 'Category 6');
INSERT INTO "category" (id, name) VALUES (7, 'Category 7');

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: inquire
--

ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('category_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: inquire
--

ALTER TABLE ONLY request ALTER COLUMN id SET DEFAULT nextval('request_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: inquire
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: inquire
--

COPY category (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inquire
--

SELECT pg_catalog.setval('category_id_seq', 1, false);


--
-- Data for Name: request; Type: TABLE DATA; Schema: public; Owner: inquire
--

COPY request (id, submit_date, processed_date, ineligible, name, email, category, request, contact_okay, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inquire
--

SELECT pg_catalog.setval('request_id_seq', 1, false);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: inquire
--

COPY "user" (email, password, id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inquire
--

SELECT pg_catalog.setval('user_id_seq', 1, false);


--
-- Name: category_name_key; Type: CONSTRAINT; Schema: public; Owner: inquire; Tablespace:
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: inquire; Tablespace:
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: request_pkey; Type: CONSTRAINT; Schema: public; Owner: inquire; Tablespace:
--

ALTER TABLE ONLY request
    ADD CONSTRAINT request_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: inquire; Tablespace:
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
