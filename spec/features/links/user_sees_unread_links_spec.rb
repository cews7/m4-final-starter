require 'rails_helper'

describe 'unread button' do
  context 'as a user on links#index' do
    let!(:user) { create(:user) }

    before do
      create_list(:link, 2, user: user)
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      visit links_path
    end

    describe 'when I click: unread links' do
      it 'reveals only unread links' do
        click_on "Unread Links"

        expect(page).to have_content user.links.first.title
        expect(page).to have_content user.links.first.url
        expect(page).to have_content user.links.last.title
        expect(page).to have_content user.links.last.url
      end
    end
  end
end
