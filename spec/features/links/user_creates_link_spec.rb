require 'rails_helper'
# need to implement ajax! do this first thing during day two!
describe 'user creates link' do
  context 'as a user', js: true do
    let!(:user) { create(:user) }

    before do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      visit links_path
    end
    
    describe 'on links#index' do
      it 'I should see a form to create a link' do
        expect(page).to have_content 'Add URL'
        expect(page).to have_field 'link_url'
        expect(page).to have_field 'link_title'
        expect(page).to have_button 'Add Link'
      end
    end

    describe 'when I add a link' do
      it 'that link persists in the db', js: true do
        expect(Link.count).to eq 0

        fill_in 'link_url', with: 'http://google.com'
        fill_in 'link_title', with: 'Google'
        click_on 'Add Link'

        expect(Link.count).to eq 1
      end

      it 'that link lives on the links#index page' do
        fill_in 'link_url', with: 'http://google.com'
        fill_in 'link_title', with: 'Google'
        click_on 'Add Link'

        link = Link.first

        expect(current_path).to eq links_path

        within "#link#{link.id}" do
          expect(page).to have_link link.url, href: link.url
          expect(page).to have_content link.title
          expect(page).to have_content 'Read? false'
          expect(page).to have_button 'Edit'
        end
      end
    end
  end
end
