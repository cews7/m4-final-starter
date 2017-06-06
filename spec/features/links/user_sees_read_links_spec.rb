require 'rails_helper'

describe 'unread button' do
  context 'as a user on links#index' do
    let(:user) { create(:user) }

    before do
      create_list(:link, 2, user: user)
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      visit links_path
    end

    describe 'when I click: read links' do
      xit 'reveals only unread links' do
        click_on "Read Links"

        expect(page).to_not have_content user.links.first.title
        expect(page).to_not have_content user.links.first.url
        expect(page).to_not have_content user.links.last.title
        expect(page).to_not have_content user.links.last.url
      end
    end
  end
end
