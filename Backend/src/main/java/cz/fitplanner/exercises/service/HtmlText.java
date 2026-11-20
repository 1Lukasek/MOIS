package cz.fitplanner.exercises.service;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.springframework.web.util.HtmlUtils;

/**
 * Wger descriptions are small HTML (p, ol, ul, li). Converts them to plain text,
 * one paragraph or list item per line. Every tag is dropped, so nothing can be injected.
 */
final class HtmlText {

    private static final Pattern TAG = Pattern.compile("<(/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*>");

    private HtmlText() {
    }

    /** Plain text, or null when nothing is left. */
    static String toPlain(String html) {
        if (html == null) {
            return null;
        }
        StringBuilder out = new StringBuilder();
        Deque<int[]> lists = new ArrayDeque<>(); // {1 = ordered, last item number}
        Matcher m = TAG.matcher(html);
        int last = 0;
        while (m.find()) {
            out.append(oneLine(html.substring(last, m.start())));
            last = m.end();
            boolean closing = !m.group(1).isEmpty();
            String tag = m.group(2).toLowerCase(Locale.ROOT);
            switch (tag) {
                case "ol", "ul" -> {
                    if (closing) {
                        lists.poll();
                    } else {
                        lists.push(new int[] {tag.equals("ol") ? 1 : 0, 0});
                    }
                    out.append('\n');
                }
                case "li" -> {
                    out.append('\n');
                    if (!closing) {
                        int[] list = lists.peek();
                        out.append(list != null && list[0] == 1 ? (++list[1]) + ". " : "• ");
                    }
                }
                case "p", "div", "br", "tr", "h1", "h2", "h3", "h4", "h5", "h6" -> out.append('\n');
                default -> {
                }
            }
        }
        out.append(oneLine(html.substring(last)));

        String text = Arrays.stream(HtmlUtils.htmlUnescape(out.toString()).split("\n"))
                .map(line -> line.replaceAll("[\\s\\u00A0]+", " ").trim())
                .filter(line -> !line.isEmpty())
                .collect(Collectors.joining("\n"));
        return text.isEmpty() ? null : text;
    }

    /** Line breaks inside the source HTML are not structure. */
    private static String oneLine(String s) {
        return s.replace('\n', ' ').replace('\r', ' ');
    }
}
