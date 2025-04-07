
-- Add page_path column to website_content table if it doesn't exist
ALTER TABLE public.website_content ADD COLUMN IF NOT EXISTS page_path text DEFAULT NULL;

-- Create landing page for Amsterdam
-- Hero section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('hero', 'Energielabel voor uw woning in Amsterdam', 
        'Professioneel EPA energielabel in Amsterdam, snel geregeld door gecertificeerde adviseurs',
        'Wij verzorgen betrouwbare energielabels voor woningen in Amsterdam en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.',
        '/energielabel-amsterdam');

-- Intro section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('intro', 'Energielabel specialist in Amsterdam', 
        'Lokale EPA-adviseurs met kennis van Amsterdam',
        'Als u een woning wilt verkopen of verhuren in Amsterdam, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in Amsterdam goed en kunnen u snel van dienst zijn met een officieel energielabel.',
        '/energielabel-amsterdam');

-- Benefits section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('benefits', 'Voordelen van ons energielabel in Amsterdam', 
        'Waarom kiezen voor EPA Woninglabel in Amsterdam?',
        '✓ Snelle service in heel Amsterdam en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar',
        '/energielabel-amsterdam');

-- Create landing page for Rotterdam
-- Hero section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('hero', 'Energielabel voor uw woning in Rotterdam', 
        'Professioneel EPA energielabel in Rotterdam, snel geregeld door gecertificeerde adviseurs',
        'Wij verzorgen betrouwbare energielabels voor woningen in Rotterdam en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.',
        '/energielabel-rotterdam');

-- Intro section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('intro', 'Energielabel specialist in Rotterdam', 
        'Lokale EPA-adviseurs met kennis van Rotterdam',
        'Als u een woning wilt verkopen of verhuren in Rotterdam, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in Rotterdam goed en kunnen u snel van dienst zijn met een officieel energielabel.',
        '/energielabel-rotterdam');

-- Benefits section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('benefits', 'Voordelen van ons energielabel in Rotterdam', 
        'Waarom kiezen voor EPA Woninglabel in Rotterdam?',
        '✓ Snelle service in heel Rotterdam en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar',
        '/energielabel-rotterdam');

-- Create landing page for Utrecht
-- Hero section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('hero', 'Energielabel voor uw woning in Utrecht', 
        'Professioneel EPA energielabel in Utrecht, snel geregeld door gecertificeerde adviseurs',
        'Wij verzorgen betrouwbare energielabels voor woningen in Utrecht en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.',
        '/energielabel-utrecht');

-- Intro section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('intro', 'Energielabel specialist in Utrecht', 
        'Lokale EPA-adviseurs met kennis van Utrecht',
        'Als u een woning wilt verkopen of verhuren in Utrecht, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in Utrecht goed en kunnen u snel van dienst zijn met een officieel energielabel.',
        '/energielabel-utrecht');

-- Benefits section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('benefits', 'Voordelen van ons energielabel in Utrecht', 
        'Waarom kiezen voor EPA Woninglabel in Utrecht?',
        '✓ Snelle service in heel Utrecht en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar',
        '/energielabel-utrecht');

-- Create landing page for Den Haag
-- Hero section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('hero', 'Energielabel voor uw woning in Den Haag', 
        'Professioneel EPA energielabel in Den Haag, snel geregeld door gecertificeerde adviseurs',
        'Wij verzorgen betrouwbare energielabels voor woningen in Den Haag en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.',
        '/energielabel-den-haag');

-- Intro section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('intro', 'Energielabel specialist in Den Haag', 
        'Lokale EPA-adviseurs met kennis van Den Haag',
        'Als u een woning wilt verkopen of verhuren in Den Haag, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in Den Haag goed en kunnen u snel van dienst zijn met een officieel energielabel.',
        '/energielabel-den-haag');

-- Benefits section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('benefits', 'Voordelen van ons energielabel in Den Haag', 
        'Waarom kiezen voor EPA Woninglabel in Den Haag?',
        '✓ Snelle service in heel Den Haag en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar',
        '/energielabel-den-haag');

-- Create landing page for Eindhoven
-- Hero section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('hero', 'Energielabel voor uw woning in Eindhoven', 
        'Professioneel EPA energielabel in Eindhoven, snel geregeld door gecertificeerde adviseurs',
        'Wij verzorgen betrouwbare energielabels voor woningen in Eindhoven en omgeving. Onze EPA-adviseurs komen bij u langs voor een professionele opname.',
        '/energielabel-eindhoven');

-- Intro section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('intro', 'Energielabel specialist in Eindhoven', 
        'Lokale EPA-adviseurs met kennis van Eindhoven',
        'Als u een woning wilt verkopen of verhuren in Eindhoven, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt in Eindhoven goed en kunnen u snel van dienst zijn met een officieel energielabel.',
        '/energielabel-eindhoven');

-- Benefits section
INSERT INTO public.website_content (section_name, title, subtitle, content, page_path)
VALUES ('benefits', 'Voordelen van ons energielabel in Eindhoven', 
        'Waarom kiezen voor EPA Woninglabel in Eindhoven?',
        '✓ Snelle service in heel Eindhoven en omgeving\n✓ Deskundige EPA-adviseurs met lokale kennis\n✓ Scherpe tarieven zonder verborgen kosten\n✓ Officieel geregistreerd bij RVO\n✓ Geldig voor 10 jaar',
        '/energielabel-eindhoven');
