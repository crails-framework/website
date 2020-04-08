def code_block code
  "<pre><code class=\"language-cpp\">#{html_escape code}</code></pre>"
end

def hint_box &block
  "<div class=\"hint-box\">" +
  block.call +
  "</div>"
end
