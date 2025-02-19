--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 17.1

-- Started on 2025-02-19 14:36:30

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
-- TOC entry 6 (class 2615 OID 16389)
-- Name: tfg_schema; Type: SCHEMA; Schema: -; Owner: alejandro
--

CREATE SCHEMA tfg_schema;


ALTER SCHEMA tfg_schema OWNER TO alejandro;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16420)
-- Name: authtoken; Type: TABLE; Schema: tfg_schema; Owner: alejandro
--

CREATE TABLE tfg_schema.authtoken (
    "ID" integer NOT NULL,
    token character varying(500) NOT NULL
);


ALTER TABLE tfg_schema.authtoken OWNER TO alejandro;

--
-- TOC entry 217 (class 1259 OID 16391)
-- Name: migrations; Type: TABLE; Schema: tfg_schema; Owner: alejandro
--

CREATE TABLE tfg_schema.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE tfg_schema.migrations OWNER TO alejandro;

--
-- TOC entry 216 (class 1259 OID 16390)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: tfg_schema; Owner: alejandro
--

CREATE SEQUENCE tfg_schema.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE tfg_schema.migrations_id_seq OWNER TO alejandro;

--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: tfg_schema; Owner: alejandro
--

ALTER SEQUENCE tfg_schema.migrations_id_seq OWNED BY tfg_schema.migrations.id;


--
-- TOC entry 220 (class 1259 OID 16407)
-- Name: postdata; Type: TABLE; Schema: tfg_schema; Owner: alejandro
--

CREATE TABLE tfg_schema.postdata (
    "ID" integer NOT NULL,
    text_content json,
    md_content json,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    title character varying(255) NOT NULL,
    emoji text NOT NULL,
    date_updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE tfg_schema.postdata OWNER TO alejandro;

--
-- TOC entry 219 (class 1259 OID 16400)
-- Name: userdata; Type: TABLE; Schema: tfg_schema; Owner: alejandro
--

CREATE TABLE tfg_schema.userdata (
    "ID" integer NOT NULL,
    username character varying(15) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(72) NOT NULL,
    type smallint NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL
);


ALTER TABLE tfg_schema.userdata OWNER TO alejandro;

--
-- TOC entry 218 (class 1259 OID 16399)
-- Name: userdata_ID_seq; Type: SEQUENCE; Schema: tfg_schema; Owner: alejandro
--

CREATE SEQUENCE tfg_schema."userdata_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE tfg_schema."userdata_ID_seq" OWNER TO alejandro;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 218
-- Name: userdata_ID_seq; Type: SEQUENCE OWNED BY; Schema: tfg_schema; Owner: alejandro
--

ALTER SEQUENCE tfg_schema."userdata_ID_seq" OWNED BY tfg_schema.userdata."ID";


--
-- TOC entry 221 (class 1259 OID 16415)
-- Name: usertype; Type: TABLE; Schema: tfg_schema; Owner: alejandro
--

CREATE TABLE tfg_schema.usertype (
    "ID" integer NOT NULL,
    name character varying(7) NOT NULL
);


ALTER TABLE tfg_schema.usertype OWNER TO alejandro;

--
-- TOC entry 3221 (class 2604 OID 16394)
-- Name: migrations id; Type: DEFAULT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.migrations ALTER COLUMN id SET DEFAULT nextval('tfg_schema.migrations_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16403)
-- Name: userdata ID; Type: DEFAULT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.userdata ALTER COLUMN "ID" SET DEFAULT nextval('tfg_schema."userdata_ID_seq"'::regclass);


--
-- TOC entry 3388 (class 0 OID 16420)
-- Dependencies: 222
-- Data for Name: authtoken; Type: TABLE DATA; Schema: tfg_schema; Owner: alejandro
--

COPY tfg_schema.authtoken ("ID", token) FROM stdin;
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZWphbmRybyIsImVtYWlsIjoiYXJjLjJkb21pbmd1ZXpAZ21haWwuY29tIiwidHlwZSI6MSwiaWF0IjoxNzM5OTcxNzM1LCJleHAiOjE3Mzk5NzUzMzV9.mWLjzkiMOFUAkygTMXSi8bd-bLreduKRp6BOnTuJ56k
\.


--
-- TOC entry 3383 (class 0 OID 16391)
-- Dependencies: 217
-- Data for Name: migrations; Type: TABLE DATA; Schema: tfg_schema; Owner: alejandro
--

COPY tfg_schema.migrations (id, "timestamp", name) FROM stdin;
1	1738847830549	InitialMigration1738847830549
2	1739477735056	InitialMigration1739477735056
3	1739646296458	InitialMigration1739646296458
\.


--
-- TOC entry 3386 (class 0 OID 16407)
-- Dependencies: 220
-- Data for Name: postdata; Type: TABLE DATA; Schema: tfg_schema; Owner: alejandro
--

COPY tfg_schema.postdata ("ID", text_content, md_content, date_creation, title, emoji, date_updated) FROM stdin;
2	[{"type":"paragraph","raw":"¡Visita mi [GitHub](https://github.com/scrmbl-egg)!","text":"¡Visita mi [GitHub](https://github.com/scrmbl-egg)!","tokens":[{"type":"text","raw":"¡Visita mi ","text":"¡Visita mi ","escaped":false},{"type":"link","raw":"[GitHub](https://github.com/scrmbl-egg)","href":"https://github.com/scrmbl-egg","title":null,"text":"GitHub","tokens":[{"type":"text","raw":"GitHub","text":"GitHub","escaped":false}]},{"type":"text","raw":"!","text":"!","escaped":false}]},{"type":"space","raw":"\\n\\n"},{"type":"paragraph","raw":"Test de LaTeX\\n$$ E\\\\left(n\\\\right) = \\\\frac{\\\\sum_{i=1}^{n+1}\\\\frac{1}{i}}{n+1} $$","text":"Test de LaTeX\\n$$ E\\\\left(n\\\\right) = \\\\frac{\\\\sum_{i=1}^{n+1}\\\\frac{1}{i}}{n+1} $$","tokens":[{"type":"text","raw":"Test de LaTeX\\n$$ E\\\\left(n\\\\right) = \\\\frac{\\\\sum_{i=1}^{n+1}\\\\frac{1}{i}}{n+1} $$","text":"Test de LaTeX\\n$$ E\\\\left(n\\\\right) = \\\\frac{\\\\sum_{i=1}^{n+1}\\\\frac{1}{i}}{n+1} $$","escaped":false}]}]	"¡Visita mi [GitHub](https://github.com/scrmbl-egg)!\\n\\nTest de LaTeX\\n$$ E\\\\left(n\\\\right) = \\\\frac{\\\\sum_{i=1}^{n+1}\\\\frac{1}{i}}{n+1} $$"	2025-02-15 22:09:41.125834	¡Test para mi amigo Alejandro!	😀	2025-02-19 13:33:46.677689
1	[{"type":"space","raw":"\\n"},{"type":"heading","raw":"# 🏝️ Animal Crossing: Un Mundo Relajante 🌿\\n\\n","depth":1,"text":"🏝️ Animal Crossing: Un Mundo Relajante 🌿","tokens":[{"type":"text","raw":"🏝️ Animal Crossing: Un Mundo Relajante 🌿","text":"🏝️ Animal Crossing: Un Mundo Relajante 🌿","escaped":false}]},{"type":"paragraph","raw":"**Animal Crossing** es una serie de videojuegos de simulación de vida desarrollada por *Nintendo*. En este juego, los jugadores pueden:","text":"**Animal Crossing** es una serie de videojuegos de simulación de vida desarrollada por *Nintendo*. En este juego, los jugadores pueden:","tokens":[{"type":"strong","raw":"**Animal Crossing**","text":"Animal Crossing","tokens":[{"type":"text","raw":"Animal Crossing","text":"Animal Crossing","escaped":false}]},{"type":"text","raw":" es una serie de videojuegos de simulación de vida desarrollada por ","text":" es una serie de videojuegos de simulación de vida desarrollada por ","escaped":false},{"type":"em","raw":"*Nintendo*","text":"Nintendo","tokens":[{"type":"text","raw":"Nintendo","text":"Nintendo","escaped":false}]},{"type":"text","raw":". En este juego, los jugadores pueden:","text":". En este juego, los jugadores pueden:","escaped":false}]},{"type":"space","raw":"\\n\\n"},{"type":"list","raw":"- Crear y personalizar su propia isla o pueblo.\\n- Interactuar con adorables vecinos animales. 🐶🐱🐻\\n- Decorar su casa con una gran variedad de muebles y objetos. 🏡✨\\n- Participar en eventos estacionales y festivales. 🎉🎃🎄","ordered":false,"start":"","loose":false,"items":[{"type":"list_item","raw":"- Crear y personalizar su propia isla o pueblo.\\n","task":false,"loose":false,"text":"Crear y personalizar su propia isla o pueblo.","tokens":[{"type":"text","raw":"Crear y personalizar su propia isla o pueblo.","text":"Crear y personalizar su propia isla o pueblo.","tokens":[{"type":"text","raw":"Crear y personalizar su propia isla o pueblo.","text":"Crear y personalizar su propia isla o pueblo.","escaped":false}]}]},{"type":"list_item","raw":"- Interactuar con adorables vecinos animales. 🐶🐱🐻\\n","task":false,"loose":false,"text":"Interactuar con adorables vecinos animales. 🐶🐱🐻","tokens":[{"type":"text","raw":"Interactuar con adorables vecinos animales. 🐶🐱🐻","text":"Interactuar con adorables vecinos animales. 🐶🐱🐻","tokens":[{"type":"text","raw":"Interactuar con adorables vecinos animales. 🐶🐱🐻","text":"Interactuar con adorables vecinos animales. 🐶🐱🐻","escaped":false}]}]},{"type":"list_item","raw":"- Decorar su casa con una gran variedad de muebles y objetos. 🏡✨\\n","task":false,"loose":false,"text":"Decorar su casa con una gran variedad de muebles y objetos. 🏡✨","tokens":[{"type":"text","raw":"Decorar su casa con una gran variedad de muebles y objetos. 🏡✨","text":"Decorar su casa con una gran variedad de muebles y objetos. 🏡✨","tokens":[{"type":"text","raw":"Decorar su casa con una gran variedad de muebles y objetos. 🏡✨","text":"Decorar su casa con una gran variedad de muebles y objetos. 🏡✨","escaped":false}]}]},{"type":"list_item","raw":"- Participar en eventos estacionales y festivales. 🎉🎃🎄","task":false,"loose":false,"text":"Participar en eventos estacionales y festivales. 🎉🎃🎄","tokens":[{"type":"text","raw":"Participar en eventos estacionales y festivales. 🎉🎃🎄","text":"Participar en eventos estacionales y festivales. 🎉🎃🎄","tokens":[{"type":"text","raw":"Participar en eventos estacionales y festivales. 🎉🎃🎄","text":"Participar en eventos estacionales y festivales. 🎉🎃🎄","escaped":false}]}]}]},{"type":"space","raw":"\\n\\n"},{"type":"heading","raw":"## 🎮 Principales Entregas\\n\\n","depth":2,"text":"🎮 Principales Entregas","tokens":[{"type":"text","raw":"🎮 Principales Entregas","text":"🎮 Principales Entregas","escaped":false}]},{"type":"table","raw":"| Título | Plataforma | Año de Lanzamiento |\\n|--------|-----------|-------------------|\\n| Animal Crossing | GameCube | 2001 |\\n| Wild World | Nintendo DS | 2005 |\\n| City Folk | Wii | 2008 |\\n| New Leaf | Nintendo 3DS | 2012 |\\n| New Horizons | Nintendo Switch | 2020 |\\n\\n","header":[{"text":"Título","tokens":[{"type":"text","raw":"Título","text":"Título","escaped":false}],"header":true,"align":null},{"text":"Plataforma","tokens":[{"type":"text","raw":"Plataforma","text":"Plataforma","escaped":false}],"header":true,"align":null},{"text":"Año de Lanzamiento","tokens":[{"type":"text","raw":"Año de Lanzamiento","text":"Año de Lanzamiento","escaped":false}],"header":true,"align":null}],"align":[null,null,null],"rows":[[{"text":"Animal Crossing","tokens":[{"type":"text","raw":"Animal Crossing","text":"Animal Crossing","escaped":false}],"header":false,"align":null},{"text":"GameCube","tokens":[{"type":"text","raw":"GameCube","text":"GameCube","escaped":false}],"header":false,"align":null},{"text":"2001","tokens":[{"type":"text","raw":"2001","text":"2001","escaped":false}],"header":false,"align":null}],[{"text":"Wild World","tokens":[{"type":"text","raw":"Wild World","text":"Wild World","escaped":false}],"header":false,"align":null},{"text":"Nintendo DS","tokens":[{"type":"text","raw":"Nintendo DS","text":"Nintendo DS","escaped":false}],"header":false,"align":null},{"text":"2005","tokens":[{"type":"text","raw":"2005","text":"2005","escaped":false}],"header":false,"align":null}],[{"text":"City Folk","tokens":[{"type":"text","raw":"City Folk","text":"City Folk","escaped":false}],"header":false,"align":null},{"text":"Wii","tokens":[{"type":"text","raw":"Wii","text":"Wii","escaped":false}],"header":false,"align":null},{"text":"2008","tokens":[{"type":"text","raw":"2008","text":"2008","escaped":false}],"header":false,"align":null}],[{"text":"New Leaf","tokens":[{"type":"text","raw":"New Leaf","text":"New Leaf","escaped":false}],"header":false,"align":null},{"text":"Nintendo 3DS","tokens":[{"type":"text","raw":"Nintendo 3DS","text":"Nintendo 3DS","escaped":false}],"header":false,"align":null},{"text":"2012","tokens":[{"type":"text","raw":"2012","text":"2012","escaped":false}],"header":false,"align":null}],[{"text":"New Horizons","tokens":[{"type":"text","raw":"New Horizons","text":"New Horizons","escaped":false}],"header":false,"align":null},{"text":"Nintendo Switch","tokens":[{"type":"text","raw":"Nintendo Switch","text":"Nintendo Switch","escaped":false}],"header":false,"align":null},{"text":"2020","tokens":[{"type":"text","raw":"2020","text":"2020","escaped":false}],"header":false,"align":null}]]},{"type":"blockquote","raw":"> *\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*","tokens":[{"type":"paragraph","raw":"*\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*","text":"*\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*","tokens":[{"type":"em","raw":"*\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*","text":"\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"","tokens":[{"type":"text","raw":"\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"","text":"\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"","escaped":false}]}]}],"text":"*\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*"},{"type":"space","raw":"\\n\\n"},{"type":"heading","raw":"## 🎨 Personalización\\n\\n","depth":2,"text":"🎨 Personalización","tokens":[{"type":"text","raw":"🎨 Personalización","text":"🎨 Personalización","escaped":false}]},{"type":"paragraph","raw":"Los jugadores pueden personalizar:","text":"Los jugadores pueden personalizar:","tokens":[{"type":"text","raw":"Los jugadores pueden personalizar:","text":"Los jugadores pueden personalizar:","escaped":false}]},{"type":"space","raw":"\\n\\n"},{"type":"list","raw":"1. **Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨\\n2. **Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎\\n3. **La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","ordered":true,"start":1,"loose":false,"items":[{"type":"list_item","raw":"1. **Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨\\n","task":false,"loose":false,"text":"**Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨","tokens":[{"type":"text","raw":"**Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨","text":"**Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨","tokens":[{"type":"strong","raw":"**Su personaje:**","text":"Su personaje:","tokens":[{"type":"text","raw":"Su personaje:","text":"Su personaje:","escaped":false}]},{"type":"text","raw":" Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨","text":" Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨","escaped":false}]}]},{"type":"list_item","raw":"2. **Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎\\n","task":false,"loose":false,"text":"**Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎","tokens":[{"type":"text","raw":"**Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎","text":"**Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎","tokens":[{"type":"strong","raw":"**Su casa:**","text":"Su casa:","tokens":[{"type":"text","raw":"Su casa:","text":"Su casa:","escaped":false}]},{"type":"text","raw":" Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎","text":" Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎","escaped":false}]}]},{"type":"list_item","raw":"3. **La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","task":false,"loose":false,"text":"**La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","tokens":[{"type":"text","raw":"**La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","text":"**La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","tokens":[{"type":"strong","raw":"**La isla/pueblo:**","text":"La isla/pueblo:","tokens":[{"type":"text","raw":"La isla/pueblo:","text":"La isla/pueblo:","escaped":false}]},{"type":"text","raw":" Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","text":" Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️","escaped":false}]}]}]},{"type":"space","raw":"\\n\\n"},{"type":"heading","raw":"## ⏳ ¿Por qué es tan adictivo?\\n\\n","depth":2,"text":"⏳ ¿Por qué es tan adictivo?","tokens":[{"type":"text","raw":"⏳ ¿Por qué es tan adictivo?","text":"⏳ ¿Por qué es tan adictivo?","escaped":false}]},{"type":"list","raw":"- 🌿 **Relajante**: No hay presión ni objetivos estrictos.\\n- 🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.\\n- 👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.","ordered":false,"start":"","loose":false,"items":[{"type":"list_item","raw":"- 🌿 **Relajante**: No hay presión ni objetivos estrictos.\\n","task":false,"loose":false,"text":"🌿 **Relajante**: No hay presión ni objetivos estrictos.","tokens":[{"type":"text","raw":"🌿 **Relajante**: No hay presión ni objetivos estrictos.","text":"🌿 **Relajante**: No hay presión ni objetivos estrictos.","tokens":[{"type":"text","raw":"🌿 ","text":"🌿 ","escaped":false},{"type":"strong","raw":"**Relajante**","text":"Relajante","tokens":[{"type":"text","raw":"Relajante","text":"Relajante","escaped":false}]},{"type":"text","raw":": No hay presión ni objetivos estrictos.","text":": No hay presión ni objetivos estrictos.","escaped":false}]}]},{"type":"list_item","raw":"- 🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.\\n","task":false,"loose":false,"text":"🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.","tokens":[{"type":"text","raw":"🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.","text":"🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.","tokens":[{"type":"text","raw":"🏆 ","text":"🏆 ","escaped":false},{"type":"strong","raw":"**Progresión constante**","text":"Progresión constante","tokens":[{"type":"text","raw":"Progresión constante","text":"Progresión constante","escaped":false}]},{"type":"text","raw":": Siempre hay algo nuevo por hacer.","text":": Siempre hay algo nuevo por hacer.","escaped":false}]}]},{"type":"list_item","raw":"- 👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.","task":false,"loose":false,"text":"👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.","tokens":[{"type":"text","raw":"👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.","text":"👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.","tokens":[{"type":"text","raw":"👫 ","text":"👫 ","escaped":false},{"type":"strong","raw":"**Interacción social**","text":"Interacción social","tokens":[{"type":"text","raw":"Interacción social","text":"Interacción social","escaped":false}]},{"type":"text","raw":": Visita las islas de tus amigos y comercia con ellos.","text":": Visita las islas de tus amigos y comercia con ellos.","escaped":false}]}]}]},{"type":"space","raw":"\\n\\n"},{"type":"heading","raw":"## 📌 Estructura de una Isla en *Animal Crossing*\\n\\n","depth":2,"text":"📌 Estructura de una Isla en *Animal Crossing*","tokens":[{"type":"text","raw":"📌 Estructura de una Isla en ","text":"📌 Estructura de una Isla en ","escaped":false},{"type":"em","raw":"*Animal Crossing*","text":"Animal Crossing","tokens":[{"type":"text","raw":"Animal Crossing","text":"Animal Crossing","escaped":false}]}]},{"type":"code","raw":"```mermaid\\ngraph TD;\\n    A[Plaza Central] -->|Conectado a| B[Tienda de Nook];\\n    A -->|Conectado a| C[Casa del Jugador];\\n    A -->|Conectado a| D[Museo];\\n    A -->|Conectado a| E[Aeropuerto];\\n    B --> F[Supermercado];\\n    C --> G[Jardín Personal];\\n```","lang":"mermaid","text":"graph TD;\\n    A[Plaza Central] -->|Conectado a| B[Tienda de Nook];\\n    A -->|Conectado a| C[Casa del Jugador];\\n    A -->|Conectado a| D[Museo];\\n    A -->|Conectado a| E[Aeropuerto];\\n    B --> F[Supermercado];\\n    C --> G[Jardín Personal];"},{"type":"space","raw":"\\n\\n"},{"type":"heading","raw":"## 🔗 Enlaces de interés\\n\\n","depth":2,"text":"🔗 Enlaces de interés","tokens":[{"type":"text","raw":"🔗 Enlaces de interés","text":"🔗 Enlaces de interés","escaped":false}]},{"type":"list","raw":"- [Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)\\n- [Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","ordered":false,"start":"","loose":false,"items":[{"type":"list_item","raw":"- [Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)\\n","task":false,"loose":false,"text":"[Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)","tokens":[{"type":"text","raw":"[Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)","text":"[Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)","tokens":[{"type":"link","raw":"[Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)","href":"https://www.animal-crossing.com/","title":null,"text":"Sitio oficial de Animal Crossing","tokens":[{"type":"text","raw":"Sitio oficial de Animal Crossing","text":"Sitio oficial de Animal Crossing","escaped":false}]}]}]},{"type":"list_item","raw":"- [Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","task":false,"loose":false,"text":"[Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","tokens":[{"type":"text","raw":"[Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","text":"[Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","tokens":[{"type":"link","raw":"[Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)","href":"https://www.reddit.com/r/AnimalCrossing/","title":null,"text":"Comunidad de Reddit","tokens":[{"type":"text","raw":"Comunidad de Reddit","text":"Comunidad de Reddit","escaped":false}]}]}]}]},{"type":"space","raw":"\\n\\n"},{"type":"hr","raw":"---"},{"type":"space","raw":"\\n\\n"},{"type":"paragraph","raw":"¿Listo para empezar tu vida en *Animal Crossing*? ¡Nos vemos en la isla! 🌊🏝️","text":"¿Listo para empezar tu vida en *Animal Crossing*? ¡Nos vemos en la isla! 🌊🏝️","tokens":[{"type":"text","raw":"¿Listo para empezar tu vida en ","text":"¿Listo para empezar tu vida en ","escaped":false},{"type":"em","raw":"*Animal Crossing*","text":"Animal Crossing","tokens":[{"type":"text","raw":"Animal Crossing","text":"Animal Crossing","escaped":false}]},{"type":"text","raw":"? ¡Nos vemos en la isla! 🌊🏝️","text":"? ¡Nos vemos en la isla! 🌊🏝️","escaped":false}]},{"type":"space","raw":"\\n\\n\\n"}]	"\\n# 🏝️ Animal Crossing: Un Mundo Relajante 🌿\\n\\n**Animal Crossing** es una serie de videojuegos de simulación de vida desarrollada por *Nintendo*. En este juego, los jugadores pueden:\\n\\n- Crear y personalizar su propia isla o pueblo.\\n- Interactuar con adorables vecinos animales. 🐶🐱🐻\\n- Decorar su casa con una gran variedad de muebles y objetos. 🏡✨\\n- Participar en eventos estacionales y festivales. 🎉🎃🎄\\n\\n## 🎮 Principales Entregas\\n\\n| Título | Plataforma | Año de Lanzamiento |\\n|--------|-----------|-------------------|\\n| Animal Crossing | GameCube | 2001 |\\n| Wild World | Nintendo DS | 2005 |\\n| City Folk | Wii | 2008 |\\n| New Leaf | Nintendo 3DS | 2012 |\\n| New Horizons | Nintendo Switch | 2020 |\\n\\n> *\\"Un juego donde cada día trae una nueva sorpresa y la vida se disfruta sin prisas.\\"*\\n\\n## 🎨 Personalización\\n\\nLos jugadores pueden personalizar:\\n\\n1. **Su personaje:** Peinados, ropa, accesorios... ¡Incluso diseñar sus propios patrones! 👕🎨\\n2. **Su casa:** Desde una cabaña modesta hasta una mansión de ensueño. 🏠💎\\n3. **La isla/pueblo:** Decoración, infraestructura y hasta la ubicación de los vecinos. 🏝️🛤️\\n\\n## ⏳ ¿Por qué es tan adictivo?\\n\\n- 🌿 **Relajante**: No hay presión ni objetivos estrictos.\\n- 🏆 **Progresión constante**: Siempre hay algo nuevo por hacer.\\n- 👫 **Interacción social**: Visita las islas de tus amigos y comercia con ellos.\\n\\n## 📌 Estructura de una Isla en *Animal Crossing*\\n\\n```mermaid\\ngraph TD;\\n    A[Plaza Central] -->|Conectado a| B[Tienda de Nook];\\n    A -->|Conectado a| C[Casa del Jugador];\\n    A -->|Conectado a| D[Museo];\\n    A -->|Conectado a| E[Aeropuerto];\\n    B --> F[Supermercado];\\n    C --> G[Jardín Personal];\\n```\\n\\n## 🔗 Enlaces de interés\\n\\n- [Sitio oficial de Animal Crossing](https://www.animal-crossing.com/)\\n- [Comunidad de Reddit](https://www.reddit.com/r/AnimalCrossing/)\\n\\n---\\n\\n¿Listo para empezar tu vida en *Animal Crossing*? ¡Nos vemos en la isla! 🌊🏝️\\n\\n\\n"	2025-02-15 20:16:29.905712	Animal Crossing!	🦉	2025-02-19 13:33:46.677689
3	[{"type":"paragraph","raw":"Un saludo a todos","text":"Un saludo a todos","tokens":[{"type":"text","raw":"Un saludo a todos","text":"Un saludo a todos","escaped":false}]}]	"Un saludo a todos"	2025-02-16 23:53:09.525153	Este es mi post	🤗	2025-02-19 13:33:46.677689
5	[{"type":"paragraph","raw":"213123123werwerwerwer","text":"213123123werwerwerwer","tokens":[{"type":"text","raw":"213123123werwerwerwer","text":"213123123werwerwerwer","escaped":false}]}]	"213123123werwerwerwer"	2025-02-19 13:29:03.786991	aaaaaaa	😜	2025-02-19 13:33:46.677689
4	[{"type":"paragraph","raw":"Felicidades Gabri 🤩🤩🤩","text":"Felicidades Gabri 🤩🤩🤩","tokens":[{"type":"text","raw":"Felicidades Gabri 🤩🤩🤩","text":"Felicidades Gabri 🤩🤩🤩","escaped":false}]}]	"Felicidades Gabri 🤩🤩🤩"	2025-02-17 17:40:20.499872	Gabri Guapeton <3	😍	2025-02-19 13:33:46.677689
\.


--
-- TOC entry 3385 (class 0 OID 16400)
-- Dependencies: 219
-- Data for Name: userdata; Type: TABLE DATA; Schema: tfg_schema; Owner: alejandro
--

COPY tfg_schema.userdata ("ID", username, email, password, type, date_creation, "isVerified") FROM stdin;
1	lotusotho	lotusotho11@gmail.com	$2a$10$WUkPiGJRI8IuFxuI55Hai.jHbSVA/EZYdQDdSlytidYv72Du7ldvO	1	2025-02-15 19:58:05.287336	t
2	scrmbl_egg	danielnaval02.contact@gmail.com	$2a$10$y5aVSfveJSocnJNj8QvP2es141rkUfYpOOHPypDy0dSBWtc93d60S	1	2025-02-15 21:58:11.12885	t
3	mrluis12	mrluisminecraft12@gmail.com	$2a$10$t8vn.4GsepEbFOQtdelKledlZk03SEboNJhSCvd1RPCjvoBVN5fLu	1	2025-02-16 23:51:23.52934	t
4	hiphonsito	carlitosnr2005@gmail.com	$2a$10$4hqAZtUgPvmgh8d9F75TpOXUAuRnmvSghYoWDA4SvGL.LDosOa9L.	1	2025-02-17 17:36:15.892963	t
5	alejandro	arc.2dominguez@gmail.com	$2a$10$3QVbpTZ.xE3bw4zbNbcPIurkJnEYP/kDO1k9Jz9pSx44iNyEFQqhK	1	2025-02-19 12:45:27.913597	t
\.


--
-- TOC entry 3387 (class 0 OID 16415)
-- Dependencies: 221
-- Data for Name: usertype; Type: TABLE DATA; Schema: tfg_schema; Owner: alejandro
--

COPY tfg_schema.usertype ("ID", name) FROM stdin;
3	ADMIN
2	PREMIUM
1	FREE
\.


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: tfg_schema; Owner: alejandro
--

SELECT pg_catalog.setval('tfg_schema.migrations_id_seq', 3, true);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 218
-- Name: userdata_ID_seq; Type: SEQUENCE SET; Schema: tfg_schema; Owner: alejandro
--

SELECT pg_catalog.setval('tfg_schema."userdata_ID_seq"', 5, true);


--
-- TOC entry 3234 (class 2606 OID 16419)
-- Name: usertype PK_47113a89a98503c3818ef2bbb7b; Type: CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.usertype
    ADD CONSTRAINT "PK_47113a89a98503c3818ef2bbb7b" PRIMARY KEY ("ID");


--
-- TOC entry 3228 (class 2606 OID 16398)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 16414)
-- Name: postdata PK_b26737b7a7124bee7e53ea01ae0; Type: CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.postdata
    ADD CONSTRAINT "PK_b26737b7a7124bee7e53ea01ae0" PRIMARY KEY ("ID");


--
-- TOC entry 3236 (class 2606 OID 16424)
-- Name: authtoken PK_cea342c55cd51dc88d98ef056dd; Type: CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.authtoken
    ADD CONSTRAINT "PK_cea342c55cd51dc88d98ef056dd" PRIMARY KEY ("ID");


--
-- TOC entry 3230 (class 2606 OID 16406)
-- Name: userdata PK_dc8f1288a71af7b13a5452ad709; Type: CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.userdata
    ADD CONSTRAINT "PK_dc8f1288a71af7b13a5452ad709" PRIMARY KEY ("ID");


--
-- TOC entry 3237 (class 2606 OID 16425)
-- Name: postdata FK_b26737b7a7124bee7e53ea01ae0; Type: FK CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.postdata
    ADD CONSTRAINT "FK_b26737b7a7124bee7e53ea01ae0" FOREIGN KEY ("ID") REFERENCES tfg_schema.userdata("ID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 16430)
-- Name: authtoken FK_cea342c55cd51dc88d98ef056dd; Type: FK CONSTRAINT; Schema: tfg_schema; Owner: alejandro
--

ALTER TABLE ONLY tfg_schema.authtoken
    ADD CONSTRAINT "FK_cea342c55cd51dc88d98ef056dd" FOREIGN KEY ("ID") REFERENCES tfg_schema.userdata("ID") ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-02-19 14:36:32

--
-- PostgreSQL database dump complete
--

