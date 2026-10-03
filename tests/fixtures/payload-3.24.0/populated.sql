--
-- PostgreSQL database dump
--

\restrict baCBJagwx4uRnmTuIhgyvETAUugQSh5mgPWQBbc0MfhrD6H7U72ABRjGMjo2XCz

-- Dumped from database version 17.11 (Debian 17.11-1.pgdg13+2)
-- Dumped by pg_dump version 17.11 (Debian 17.11-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'Editor'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: about_page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.about_page (
    id integer NOT NULL,
    our_philosophy jsonb,
    who_we_are jsonb,
    what_we_do jsonb,
    our_vision jsonb,
    our_mission jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: about_page_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.about_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: about_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.about_page_id_seq OWNED BY public.about_page.id;


--
-- Name: konten_berita; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.konten_berita (
    id integer NOT NULL,
    judul character varying NOT NULL,
    gambar_id integer NOT NULL,
    konten jsonb NOT NULL,
    short_description character varying,
    slug character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: konten_berita_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.konten_berita_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: konten_berita_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.konten_berita_id_seq OWNED BY public.konten_berita.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_kotak_url character varying,
    sizes_kotak_width numeric,
    sizes_kotak_height numeric,
    sizes_kotak_mime_type character varying,
    sizes_kotak_filesize numeric,
    sizes_kotak_filename character varying,
    sizes_banner_url character varying,
    sizes_banner_width numeric,
    sizes_banner_height numeric,
    sizes_banner_mime_type character varying,
    sizes_banner_filesize numeric,
    sizes_banner_filename character varying
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    message_title character varying NOT NULL,
    message character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    konten_berita_id integer,
    portofolio_page_id integer,
    portofolio_top_id integer,
    about_page_id integer,
    messages_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: portofolio_page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portofolio_page (
    id integer NOT NULL,
    title character varying NOT NULL,
    image_id integer NOT NULL,
    content jsonb NOT NULL,
    short_description character varying NOT NULL,
    slug character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: portofolio_page_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portofolio_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portofolio_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portofolio_page_id_seq OWNED BY public.portofolio_page.id;


--
-- Name: portofolio_top; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portofolio_top (
    id integer NOT NULL,
    description character varying NOT NULL,
    image_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: portofolio_top_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portofolio_top_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portofolio_top_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portofolio_top_id_seq OWNED BY public.portofolio_top.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    role public.enum_users_role NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: about_page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.about_page ALTER COLUMN id SET DEFAULT nextval('public.about_page_id_seq'::regclass);


--
-- Name: konten_berita id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.konten_berita ALTER COLUMN id SET DEFAULT nextval('public.konten_berita_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: portofolio_page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_page ALTER COLUMN id SET DEFAULT nextval('public.portofolio_page_id_seq'::regclass);


--
-- Name: portofolio_top id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_top ALTER COLUMN id SET DEFAULT nextval('public.portofolio_top_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: about_page; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: konten_berita; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.messages VALUES (1, 'Upgrade fixture', 'message@example.test', NULL, 'Upgrade regression', 'Existing content survives', '2026-10-03 13:39:59.413+00', '2026-10-03 13:39:59.412+00');


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: portofolio_page; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: portofolio_top; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'admin', 'admin', '2026-10-03 13:39:59.18+00', '2026-10-03 13:39:59.098+00', 'admin@upgrade.example.test', NULL, NULL, 'fa07435d52ea0a871724d52565b1564c4c69324bb342d4375fc162b2dafc49d6', '622ac49882781b25555f506f7b273f3373d562fc04e9c4b6ececd78516d0988e1ec69968520938cdff627a19f04c7e59e20945e8473a8373f2a7407b78dc2e1f5317ff4cb389c033bb4f69e70c02a3d91955bdb609262df22fef6514113172befcb35b92116a1f2dc595ca5ae62a6b242ad5a457c5891c5fd136bd4e012a7cab9bb5f284ec1fad91add25b3519c0b12d71cfe0fc3fb9f5424cea9a67931310ba37a1c1add3aa864f8c3bc15121fdef9bed17b3db484e396fa9984f1e58ac61e42abd43efb0d4066153615e8f00013a1da2d7fc52b24100c383413bbe0b6e5df0aaa8886c5fa0abff63f860c87195e83c646345b35851169bf722210d7ea6db01ca39917d225749eacf3f055466938b961fedd9b6cb541f0836f15c23fc219a157afd54616269ecef0b65692c35698fa58159dd87c53e30a1f4132278fe71dbe236014870319097486713764526f764d5b24f9a89f355ff78fa88e0c0ee3b81680af705dde1a1052237b5912368610a8ce49a9b4b7fbdfaf241120562a5d695508884fd18252b90c957c9a8241e30c451a940f7d48909c1c067f6eedb419517e7b7ec246f9ef21b27d0b260f9f5489d37817c09e4c96a9d47030881d46bf7f5a64fb6752ace7333f21cd5443c848294f8e27c2b6f8692447170130193a35616b86043a9fa60d180d53ce2558e3499cdf7a1b323b8193b5fdfa6e9e6dcc2c26f9e', 0, NULL);
INSERT INTO public.users VALUES (2, 'Editor', 'Editor', '2026-10-03 13:39:59.335+00', '2026-10-03 13:39:59.265+00', 'editor@upgrade.example.test', NULL, NULL, '6fd16b598341eccf1ba9726800912ca71254561e63f23c7ece5468ab7e66dc53', 'e2bda66c9f2a6418321bbf2ab8a2620d37700d2843d77ab2502cd9fda714e7f51ed3f4d56deddbc0c2817b07c997c26b5f172b338dc58b3977f35de91333db60696e7f79654583b5b98c7832d904e2d0fb250baf894c12d2b21e9834358a43b93b06f0565045d4619d12695476de49886b8157f0e42a217cd4a54a8bd4aa16151f988c0dda46921d5edb8d2651e3a82acbf7d6380200b85c715825229f7b319b7e723d4cc8deae646594eb1334d653c3bf1b533013085449d5dc52a2d7a09a7cb53d7f5f3eee2c2bb35d215de9dc3d3ab71e9f20c30ed2a059e1482a241cdf8b2da0ad3f14b1a8aa8cc236b88dd39061febad6b4c6f7f7cebd93bdf1f3be8e1ed69b112772af9579f2de71705a0091be55301a5d025d48c14ca7b712f75912665eb2f4ea2ec2345b4b5f1b793d8042754745a129df8206874d4967a42f5dfd3e14f1ca417c15565e498c98733b6977b07e2f2d7e36f74faf0be10c36fa94c47378424fe921f8a8a00491f2ae3ae58a651f6351b71c4931a385b1b800ecf6529ebca186e97314191a75f1b0b72425778b75f09837aca976415fef21595b53a1eb4a2fef8dea1e5509ec7e0fe5b3b4eb0acc9012dee2d1dc4225f528e5dbec6cf78e28534c0cedd22e6472bf7d3628cf51e8d2af45098f206490bdc695d97b809bfb58d37b0c0e6dfdf150c10854799238154f4cfaad66d1b0a0599b86972e44da', 0, NULL);


--
-- Name: about_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_id_seq', 1, false);


--
-- Name: konten_berita_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.konten_berita_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, true);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 1, false);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 1, false);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 1, false);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 1, false);


--
-- Name: portofolio_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.portofolio_page_id_seq', 1, false);


--
-- Name: portofolio_top_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.portofolio_top_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: about_page about_page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.about_page
    ADD CONSTRAINT about_page_pkey PRIMARY KEY (id);


--
-- Name: konten_berita konten_berita_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.konten_berita
    ADD CONSTRAINT konten_berita_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: portofolio_page portofolio_page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_page
    ADD CONSTRAINT portofolio_page_pkey PRIMARY KEY (id);


--
-- Name: portofolio_top portofolio_top_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_top
    ADD CONSTRAINT portofolio_top_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: about_page_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX about_page_created_at_idx ON public.about_page USING btree (created_at);


--
-- Name: about_page_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX about_page_updated_at_idx ON public.about_page USING btree (updated_at);


--
-- Name: konten_berita_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX konten_berita_created_at_idx ON public.konten_berita USING btree (created_at);


--
-- Name: konten_berita_gambar_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX konten_berita_gambar_idx ON public.konten_berita USING btree (gambar_id);


--
-- Name: konten_berita_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX konten_berita_slug_idx ON public.konten_berita USING btree (slug);


--
-- Name: konten_berita_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX konten_berita_updated_at_idx ON public.konten_berita USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_sizes_banner_sizes_banner_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_banner_sizes_banner_filename_idx ON public.media USING btree (sizes_banner_filename);


--
-- Name: media_sizes_kotak_sizes_kotak_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_kotak_sizes_kotak_filename_idx ON public.media USING btree (sizes_kotak_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: messages_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_created_at_idx ON public.messages USING btree (created_at);


--
-- Name: messages_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_updated_at_idx ON public.messages USING btree (updated_at);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_about_page_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_about_page_id_idx ON public.payload_locked_documents_rels USING btree (about_page_id);


--
-- Name: payload_locked_documents_rels_konten_berita_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_konten_berita_id_idx ON public.payload_locked_documents_rels USING btree (konten_berita_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_messages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_messages_id_idx ON public.payload_locked_documents_rels USING btree (messages_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_portofolio_page_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_portofolio_page_id_idx ON public.payload_locked_documents_rels USING btree (portofolio_page_id);


--
-- Name: payload_locked_documents_rels_portofolio_top_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_portofolio_top_id_idx ON public.payload_locked_documents_rels USING btree (portofolio_top_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: portofolio_page_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_page_created_at_idx ON public.portofolio_page USING btree (created_at);


--
-- Name: portofolio_page_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_page_image_idx ON public.portofolio_page USING btree (image_id);


--
-- Name: portofolio_page_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX portofolio_page_slug_idx ON public.portofolio_page USING btree (slug);


--
-- Name: portofolio_page_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_page_updated_at_idx ON public.portofolio_page USING btree (updated_at);


--
-- Name: portofolio_top_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_top_created_at_idx ON public.portofolio_top USING btree (created_at);


--
-- Name: portofolio_top_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_top_image_idx ON public.portofolio_top USING btree (image_id);


--
-- Name: portofolio_top_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX portofolio_top_updated_at_idx ON public.portofolio_top USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: konten_berita konten_berita_gambar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.konten_berita
    ADD CONSTRAINT konten_berita_gambar_id_media_id_fk FOREIGN KEY (gambar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_about_page_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_about_page_fk FOREIGN KEY (about_page_id) REFERENCES public.about_page(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_konten_berita_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_konten_berita_fk FOREIGN KEY (konten_berita_id) REFERENCES public.konten_berita(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_messages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_messages_fk FOREIGN KEY (messages_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_portofolio_page_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_portofolio_page_fk FOREIGN KEY (portofolio_page_id) REFERENCES public.portofolio_page(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_portofolio_top_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_portofolio_top_fk FOREIGN KEY (portofolio_top_id) REFERENCES public.portofolio_top(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: portofolio_page portofolio_page_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_page
    ADD CONSTRAINT portofolio_page_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: portofolio_top portofolio_top_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portofolio_top
    ADD CONSTRAINT portofolio_top_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict baCBJagwx4uRnmTuIhgyvETAUugQSh5mgPWQBbc0MfhrD6H7U72ABRjGMjo2XCz

