#!/usr/bin/env zsh
# Test script to check if content files are accessible

echo "Testing access to content files..."

# Test main content files
for file in about.md hero-content.md hero-header.md footer.md; do
  response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/content/$file)
  if [ $response -eq 200 ]; then
    echo "✅ /content/$file - $response OK"
  else
    echo "❌ /content/$file - $response ERROR"
  fi
done

# Test case study files
for file in open-universities-australia.md marvel-stadium.md australia-post.md xero.md apple-vision-pro.md; do
  response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/content/case-studies/$file)
  if [ $response -eq 200 ]; then
    echo "✅ /content/case-studies/$file - $response OK"
  else
    echo "❌ /content/case-studies/$file - $response ERROR"
  fi
done

# Test case study routing
for route in open-universities-australia marvel-stadium australia-post xero apple-vision-pro; do
  response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/case-study/$route)
  if [ $response -eq 200 ]; then
    echo "✅ /case-study/$route - $response OK"
  else
    echo "❌ /case-study/$route - $response ERROR"
  fi
done

echo "Testing complete!"
